import { getAccessToken } from '../config/api.js';

export function initHomePage() {
  updateStats();
  
  // 플래너 업데이트 이벤트 리스너
  window.addEventListener('plannerUpdated', () => {
    calculateStats();
  });

  // 목표/영양/바디 변경 시 홈 갱신
  window.addEventListener('goalsUpdated', () => calculateStats());
  window.addEventListener('nutritionUpdated', () => calculateStats());
  window.addEventListener('bodyUpdated', () => calculateStats());
  
  // 지갑 연결/해제 시 홈 화면 업데이트
  window.addEventListener('walletConnected', () => updateStats());
  window.addEventListener('walletDisconnected', () => updateStats());

  // 버튼 바인딩 (중복 방지 위해 onClick 사용)
  document.getElementById('btnTodayOpenPlanner')?.addEventListener('click', () => {
    document.getElementById('btnPlanner')?.click();
  });
  document.getElementById('btnTodayOpenNutrition')?.addEventListener('click', () => {
    document.getElementById('btnNutrition')?.click();
  });
  document.getElementById('btnTodayOpenBody')?.addEventListener('click', () => {
    document.getElementById('btnBodyTracker')?.click();
  });
  document.getElementById('btnTodayOpenWorkoutLog')?.addEventListener('click', () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      localStorage.setItem('workout_log_prefill', JSON.stringify({ date: today }));
    } catch (_) {}
    window.history.pushState({}, '', '/workout-log');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
}

function updateStats() {
  const isConnected = !!getAccessToken();
  
  // 지갑 연결 상태에 따라 화면 표시
  const notConnectedDiv = document.getElementById('home-not-connected');
  const connectedDiv = document.getElementById('home-connected');
  
  if (isConnected) {
    if (notConnectedDiv) notConnectedDiv.style.display = 'none';
    if (connectedDiv) connectedDiv.style.display = 'block';
    
    // 통계 계산
    calculateStats();
  } else {
    if (notConnectedDiv) notConnectedDiv.style.display = 'block';
    if (connectedDiv) connectedDiv.style.display = 'none';
  }
}

function calculateStats() {
  // 운동 기록에서 통계 계산
  const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
  const plannerItems = JSON.parse(localStorage.getItem('planner_items') || '[]');
  
  // 이번 주 운동 횟수
  const thisWeek = getWeekDates();
  const thisWeekWorkouts = logs.filter(log => {
    const logDate = new Date(log.date);
    return logDate >= thisWeek.start && logDate <= thisWeek.end;
  }).length;
  
  // 예정된 일정 수
  const upcomingPlans = plannerItems.filter(item => {
    const startAt = new Date(item.start_at);
    return startAt >= new Date() && item.status === 'scheduled';
  }).length;
  
  // 완료한 운동 수
  const completedWorkouts = plannerItems.filter(item => item.status === 'done').length;
  
  // 통계 업데이트
  const chatCountEl = document.getElementById('statChatCount');
  const plannerCountEl = document.getElementById('statPlannerCount');
  const completedCountEl = document.getElementById('statCompletedCount');
  
  if (chatCountEl) chatCountEl.textContent = thisWeekWorkouts;
  if (plannerCountEl) plannerCountEl.textContent = upcomingPlans;
  if (completedCountEl) completedCountEl.textContent = completedWorkouts;

  // 목표 달성률 계산 및 원형 프로그레스 업데이트
  updateWeeklyGoalProgress(thisWeekWorkouts, completedWorkouts);

  // 오늘 체크리스트 업데이트
  updateTodayChecklist();
}

function updateTodayChecklist() {
  const todayStr = new Date().toISOString().split('T')[0];

  const todayLabel = document.getElementById('todayDateLabel');
  if (todayLabel) {
    const d = new Date(`${todayStr}T00:00:00`);
    todayLabel.textContent = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'short' });
  }

  const plannerItems = JSON.parse(localStorage.getItem('planner_items') || '[]');
  const todayPlans = plannerItems.filter(item => {
    const itemDate = new Date(item.start_at);
    return itemDate.toISOString().split('T')[0] === todayStr;
  });
  const todayScheduled = todayPlans.filter(i => i.status === 'scheduled').length;
  const todayDone = todayPlans.filter(i => i.status === 'done').length;

  const todayPlannerSub = document.getElementById('todayPlannerSub');
  if (todayPlannerSub) {
    if (todayPlans.length === 0) todayPlannerSub.textContent = 'No schedule today';
    else todayPlannerSub.textContent = `Scheduled: ${todayScheduled} · Done: ${todayDone}`;
  }

  const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
  const todayLog = logs.find(l => l.date === todayStr);
  const todayWorkoutLogSub = document.getElementById('todayWorkoutLogSub');
  if (todayWorkoutLogSub) {
    if (!todayLog) todayWorkoutLogSub.textContent = 'No records';
    else todayWorkoutLogSub.textContent = `${todayLog.exercises?.length || 0} exercises logged`;
  }

  const goal = JSON.parse(localStorage.getItem('calorie_goal') || 'null');
  const target = goal?.target ? goal.target : 2000;
  const nutritionLogs = JSON.parse(localStorage.getItem('nutrition_logs') || '[]');
  const todayNutrition = nutritionLogs.find(l => l.date === todayStr);
  const consumed = todayNutrition ? todayNutrition.items.reduce((sum, it) => sum + (it.calories || 0), 0) : 0;
  const todayCaloriesSub = document.getElementById('todayCaloriesSub');
  if (todayCaloriesSub) {
    todayCaloriesSub.textContent = `${consumed} / ${target} kcal`;
  }

  const measurements = JSON.parse(localStorage.getItem('body_measurements') || '[]');
  const todayMeasurement = measurements.slice().reverse().find(m => {
    const d = new Date(m.date);
    return d.toISOString().split('T')[0] === todayStr;
  });
  const todayBodySub = document.getElementById('todayBodySub');
  if (todayBodySub) {
    todayBodySub.textContent = todayMeasurement ? `Recorded (${todayMeasurement.weight}kg)` : 'Not recorded';
  }
}

function updateWeeklyGoalProgress(workouts, completed) {
  // 주간 목표 (기본값 5회, 사용자가 설정 가능)
  const weeklyGoal = parseInt(localStorage.getItem('weekly_workout_goal') || '5');
  
  // 달성률 계산 (운동 횟수와 완료율을 고려)
  const workoutProgress = Math.min(100, (workouts / weeklyGoal) * 100);
  const completionProgress = completed > 0 ? Math.min(100, (completed / Math.max(workouts, 1)) * 100) : 0;
  
  // 가중 평균 (운동 횟수 70%, 완료율 30%)
  const overallProgress = Math.round(workoutProgress * 0.7 + completionProgress * 0.3);
  
  const circle = document.getElementById('weeklyGoalCircle');
  const valueEl = document.getElementById('weeklyGoalValue');
  const subtitleEl = document.getElementById('weeklyGoalSubtitle');
  
  if (circle && valueEl) {
    // 원주 = 2 * π * r = 2 * π * 72 ≈ 452
    const circumference = 2 * Math.PI * 72;
    const offset = circumference - (overallProgress / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
    
    // 색상 변경
    circle.setAttribute('class', 'circular-progress-circle');
    if (overallProgress >= 80) {
      circle.classList.add('success');
    } else if (overallProgress >= 50) {
      circle.classList.add('warning');
    } else if (overallProgress < 30) {
      circle.classList.add('danger');
    }
    
    valueEl.textContent = `${overallProgress}%`;
    
    if (subtitleEl) {
      if (weeklyGoal === 0) {
        subtitleEl.textContent = 'Set your weekly workout goal';
      } else if (overallProgress >= 100) {
        subtitleEl.textContent = `Goal achieved! ${workouts} workouts completed`;
      } else {
        subtitleEl.textContent = `${workouts}/${weeklyGoal} workouts completed`;
      }
    }
  }
}

function getWeekDates() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day;
  const start = new Date(now.setDate(diff));
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}