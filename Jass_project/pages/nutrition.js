import { getAccessToken } from '../config/api.js';

function updatePageContent() {
  if (!getAccessToken()) {
    const container = document.getElementById('nutritionContainer');
    if (container) {
      container.innerHTML = '<div class="muted">Login is required.</div>';
    }
    
    // 칼로리 원형 프로그레스 초기화
    const calorieCircle = document.getElementById('calorieCircle');
    const calorieCircularValue = document.getElementById('calorieCircularValue');
    const consumedEl = document.getElementById('caloriesConsumed');
    const remainingEl = document.getElementById('caloriesRemaining');
    const targetEl = document.getElementById('caloriesTarget');
    
    if (calorieCircle) {
      const circumference = 2 * Math.PI * 72;
      calorieCircle.style.strokeDashoffset = circumference;
      calorieCircle.setAttribute('class', 'circular-progress-circle');
    }
    if (calorieCircularValue) calorieCircularValue.textContent = '0';
    if (consumedEl) consumedEl.textContent = '0';
    if (remainingEl) remainingEl.textContent = '0';
    if (targetEl) targetEl.textContent = '0';
    
    // 매크로 프로그레스 초기화
    const proteinProgress = document.getElementById('proteinProgress');
    const carbsProgress = document.getElementById('carbsProgress');
    const fatProgress = document.getElementById('fatProgress');
    const proteinEl = document.getElementById('totalProtein');
    const carbsEl = document.getElementById('totalCarbs');
    const fatEl = document.getElementById('totalFat');
    
    if (proteinProgress) proteinProgress.style.width = '0%';
    if (carbsProgress) carbsProgress.style.width = '0%';
    if (fatProgress) fatProgress.style.width = '0%';
    if (proteinEl) proteinEl.textContent = '0g';
    if (carbsEl) carbsEl.textContent = '0g';
    if (fatEl) fatEl.textContent = '0g';
    
    // 식단 목록 초기화
    const list = document.getElementById('nutritionList');
    if (list) {
      list.innerHTML = '<div class="muted">Login is required.</div>';
    }
    
    return;
  }

  loadNutritionData();
  loadDailyLogs();
  
  const form = document.getElementById('nutritionForm');
  if (form && !form.hasAttribute('data-listener-added')) {
    form.addEventListener('submit', handleNutritionSubmit);
    form.setAttribute('data-listener-added', 'true');
  }
  
  const goalForm = document.getElementById('calorieGoalForm');
  if (goalForm && !goalForm.hasAttribute('data-listener-added')) {
    goalForm.addEventListener('submit', handleGoalSubmit);
    goalForm.setAttribute('data-listener-added', 'true');
  }
  
  loadCalorieGoal();
}

// 전역 이벤트 리스너 (한 번만 추가) - 함수 정의 후 추가
if (!window.nutritionWalletListenerAdded) {
  window.addEventListener('walletConnected', () => {
    const nutritionPage = document.getElementById('page-nutrition');
    if (nutritionPage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });

  window.addEventListener('walletDisconnected', () => {
    const nutritionPage = document.getElementById('page-nutrition');
    if (nutritionPage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });
  window.nutritionWalletListenerAdded = true;
}

// 전역에서 접근 가능하도록 함수를 window에 등록
window.nutritionUpdatePageContent = updatePageContent;

export function initNutritionPage() {
  updatePageContent();
  
  return {
    cleanup: () => {
      // 전역 이벤트는 제거하지 않음
    }
  };
}

function loadCalorieGoal() {
  const goal = JSON.parse(localStorage.getItem('calorie_goal') || 'null');
  const goalInput = document.getElementById('calorieGoalInput');
  
  if (goal && goalInput) {
    goalInput.value = goal.target;
  }
}

function handleGoalSubmit(e) {
  e.preventDefault();
  const target = parseInt(document.getElementById('calorieGoalInput')?.value || '0');
  
  if (target <= 0) {
    alert('Please enter a valid calorie goal.');
    return;
  }

  localStorage.setItem('calorie_goal', JSON.stringify({ target }));
  alert('Calorie goal has been set.');
  loadNutritionData();
}

function loadNutritionData() {
  const today = new Date().toISOString().split('T')[0];
  const logs = JSON.parse(localStorage.getItem('nutrition_logs') || '[]');
  const todayLog = logs.find(log => log.date === today);
  
  const goal = JSON.parse(localStorage.getItem('calorie_goal') || 'null');
  const target = goal ? goal.target : 2000;
  
  const consumed = todayLog ? todayLog.items.reduce((sum, item) => sum + (item.calories || 0), 0) : 0;
  const remaining = Math.max(0, target - consumed);
  const percentage = target > 0 ? Math.min(100, (consumed / target) * 100) : 0;
  
  // 칼로리 원형 프로그레스 업데이트
  const calorieCircle = document.getElementById('calorieCircle');
  const calorieCircularValue = document.getElementById('calorieCircularValue');
  const consumedEl = document.getElementById('caloriesConsumed');
  const remainingEl = document.getElementById('caloriesRemaining');
  const targetEl = document.getElementById('caloriesTarget');
  
  if (calorieCircle) {
    const circumference = 2 * Math.PI * 72;
    const offset = circumference - (percentage / 100) * circumference;
    calorieCircle.style.strokeDashoffset = offset;
    
    // 색상 변경
    calorieCircle.setAttribute('class', 'circular-progress-circle');
    if (percentage >= 100) {
      calorieCircle.classList.add('danger');
    } else if (percentage >= 80) {
      calorieCircle.classList.add('warning');
    } else {
      calorieCircle.classList.add('success');
    }
  }
  
  if (calorieCircularValue) {
    calorieCircularValue.textContent = consumed;
  }
  if (consumedEl) consumedEl.textContent = consumed;
  if (remainingEl) remainingEl.textContent = remaining;
  if (targetEl) targetEl.textContent = target;
  
  // 영양소 분석 및 프로그레스 업데이트
  const protein = todayLog ? todayLog.items.reduce((sum, item) => sum + (item.protein || 0), 0) : 0;
  const carbs = todayLog ? todayLog.items.reduce((sum, item) => sum + (item.carbs || 0), 0) : 0;
  const fat = todayLog ? todayLog.items.reduce((sum, item) => sum + (item.fat || 0), 0) : 0;
  
  // 목표값 (일반적인 권장량 기준)
  const proteinGoal = 150; // g
  const carbsGoal = 250; // g
  const fatGoal = 65; // g
    
    const proteinEl = document.getElementById('totalProtein');
    const carbsEl = document.getElementById('totalCarbs');
    const fatEl = document.getElementById('totalFat');
  const proteinProgress = document.getElementById('proteinProgress');
  const carbsProgress = document.getElementById('carbsProgress');
  const fatProgress = document.getElementById('fatProgress');
    
    if (proteinEl) proteinEl.textContent = `${protein}g`;
    if (carbsEl) carbsEl.textContent = `${carbs}g`;
    if (fatEl) fatEl.textContent = `${fat}g`;
  
  if (proteinProgress) {
    const proteinPercent = Math.min(100, (protein / proteinGoal) * 100);
    proteinProgress.style.width = `${proteinPercent}%`;
  }
  if (carbsProgress) {
    const carbsPercent = Math.min(100, (carbs / carbsGoal) * 100);
    carbsProgress.style.width = `${carbsPercent}%`;
  }
  if (fatProgress) {
    const fatPercent = Math.min(100, (fat / fatGoal) * 100);
    fatProgress.style.width = `${fatPercent}%`;
  }
}

function loadDailyLogs() {
  const today = new Date().toISOString().split('T')[0];
  const logs = JSON.parse(localStorage.getItem('nutrition_logs') || '[]');
  const todayLog = logs.find(log => log.date === today);
  
  const list = document.getElementById('nutritionList');
  if (!list) return;
  
  if (!todayLog || todayLog.items.length === 0) {
    list.innerHTML = '<div class="muted">No meals recorded today.</div>';
    return;
  }

  list.innerHTML = todayLog.items.map((item, idx) => `
    <div class="nutrition-item">
      <div class="nutrition-name">${item.name}</div>
      <div class="nutrition-details">
        <span>Calories: ${item.calories || 0}kcal</span>
        ${item.protein ? `<span>Protein: ${item.protein}g</span>` : ''}
        ${item.carbs ? `<span>Carbs: ${item.carbs}g</span>` : ''}
        ${item.fat ? `<span>Fat: ${item.fat}g</span>` : ''}
      </div>
      <button class="danger" onclick="window.deleteNutritionItem(${idx})" style="font-size: 12px; padding: 4px 8px;">Delete</button>
    </div>
  `).join('');
}

function handleNutritionSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('foodName')?.value;
  const calories = parseInt(document.getElementById('foodCalories')?.value || '0');
  const protein = parseFloat(document.getElementById('foodProtein')?.value || '0');
  const carbs = parseFloat(document.getElementById('foodCarbs')?.value || '0');
  const fat = parseFloat(document.getElementById('foodFat')?.value || '0');
  
  if (!name || calories <= 0) {
    alert('Please enter food name and calories.');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const logs = JSON.parse(localStorage.getItem('nutrition_logs') || '[]');
  
  let todayLog = logs.find(log => log.date === today);
  if (!todayLog) {
    todayLog = { date: today, items: [] };
    logs.push(todayLog);
  }
  
  todayLog.items.push({ name, calories, protein, carbs, fat });
  localStorage.setItem('nutrition_logs', JSON.stringify(logs));
  
  alert('Meal recorded successfully.');
  e.target.reset();
  loadNutritionData();
  loadDailyLogs();
}

window.deleteNutritionItem = (idx) => {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  const today = new Date().toISOString().split('T')[0];
  const logs = JSON.parse(localStorage.getItem('nutrition_logs') || '[]');
  const todayLog = logs.find(log => log.date === today);
  
  if (todayLog) {
    todayLog.items.splice(idx, 1);
    localStorage.setItem('nutrition_logs', JSON.stringify(logs));
    loadNutritionData();
    loadDailyLogs();
  }
};