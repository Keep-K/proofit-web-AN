import { fetchJSON } from '../utils/api.js';
import { getAccessToken } from '../config/api.js';

function updatePageContent() {
  const workoutList = document.getElementById('workoutLogList');
  const workoutForm = document.getElementById('workoutLogForm');
  const btnLoadLogs = document.getElementById('btnLoadWorkoutLogs');
  const workoutDateInput = document.getElementById('workoutLogDate');

  // 기본 날짜: 오늘
  const todayStr = new Date().toISOString().split('T')[0];
  if (workoutDateInput && !workoutDateInput.value) {
    workoutDateInput.value = todayStr;
  }

  // 플래너 등에서 넘어온 프리필 적용
  try {
    const prefillRaw = localStorage.getItem('workout_log_prefill');
    if (prefillRaw) {
      const prefill = JSON.parse(prefillRaw);
      const date = prefill?.date;
      const exerciseName = prefill?.exerciseName;
      if (workoutDateInput && date) workoutDateInput.value = date;
      const exerciseEl = document.getElementById('exerciseName');
      if (exerciseEl && exerciseName) exerciseEl.value = exerciseName;
      localStorage.removeItem('workout_log_prefill');
    }
  } catch (_) {
    // ignore
  }

  // 로그인 상태 확인 및 UI 업데이트
  if (!getAccessToken()) {
    if (workoutList) {
      workoutList.innerHTML = '<div class="muted">로그인이 필요합니다.</div>';
    }
    
    // 폼 초기화
    if (workoutForm) {
      workoutForm.reset();
    }
    if (workoutDateInput) {
      workoutDateInput.value = todayStr;
    }
    
    // 세트 컨테이너 초기화
    const setsContainer = document.getElementById('setsContainer');
    if (setsContainer) {
      setsContainer.innerHTML = '';
      // 기본 세트 하나 추가
      const setDiv = document.createElement('div');
      setDiv.className = 'set-input';
      setDiv.innerHTML = `
        <input type="number" class="set-weight" placeholder="Weight (kg)" />
        <input type="number" class="set-reps" placeholder="Reps" required />
        <button type="button" class="btn-danger" onclick="this.parentElement.remove()">Delete</button>
      `;
      setsContainer.appendChild(setDiv);
    }
    
    return;
  }

  // 이벤트 리스너 바인딩 (중복 방지)
  if (btnLoadLogs && !btnLoadLogs.hasAttribute('data-listener-added')) {
    btnLoadLogs.addEventListener('click', loadWorkoutLogs);
    btnLoadLogs.setAttribute('data-listener-added', 'true');
  }

  if (workoutForm && !workoutForm.hasAttribute('data-listener-added')) {
    workoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!getAccessToken()) {
        alert('Login is required.');
        return;
      }

      try {
        const selectedDate = workoutDateInput?.value || todayStr;
        const exerciseName = document.getElementById('exerciseName')?.value;
        const sets = [];
        
        // 세트 데이터 수집
        const setInputs = document.querySelectorAll('.set-input');
        setInputs.forEach(setInput => {
          const weight = parseFloat(setInput.querySelector('.set-weight')?.value || 0);
          const reps = parseInt(setInput.querySelector('.set-reps')?.value || 0);
          if (reps > 0) {
            sets.push({ weight, reps });
          }
        });

        if (!exerciseName || sets.length === 0) {
          alert('Please enter exercise name and at least 1 set.');
          return;
        }

        // 임시: 로컬 스토리지에 저장
        const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
        let dayLog = logs.find(log => log.date === selectedDate);
        if (!dayLog) {
          dayLog = { date: selectedDate, exercises: [] };
          logs.unshift(dayLog);
        }

        const existingExercise = dayLog.exercises.find(ex => ex.name === exerciseName);
        if (existingExercise) {
          existingExercise.sets.push(...sets);
        } else {
          dayLog.exercises.push({ name: exerciseName, sets });
        }

        localStorage.setItem('workout_logs', JSON.stringify(logs));
        
        alert('Workout log saved successfully.');
        workoutForm.reset();
        if (workoutDateInput) workoutDateInput.value = selectedDate;
        await loadWorkoutLogs();
      } catch (e) {
        console.error(e);
        alert(`Error: ${e.message}`);
      }
    });
    workoutForm.setAttribute('data-listener-added', 'true');
  }

  loadWorkoutLogs();
}

async function loadWorkoutLogs() {
  const workoutList = document.getElementById('workoutLogList');
  
  if (!getAccessToken()) {
    if (workoutList) {
      workoutList.innerHTML = '<div class="muted">로그인이 필요합니다.</div>';
    }
    return;
  }

  try {
    // 백엔드 API가 준비되면 여기서 데이터 가져오기
    // const data = await fetchJSON('/workout/logs');
    
    // 임시: 로컬 스토리지에서 가져오기
    const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
    
    if (logs.length === 0) {
      if (workoutList) {
        workoutList.innerHTML = '<div class="muted">No workouts recorded.</div>';
      }
      return;
    }

    if (workoutList) {
      workoutList.innerHTML = logs.map((log, idx) => {
        const date = new Date(log.date);
        return `
          <div class="workout-log-item">
            <div class="workout-log-header">
              <h4>${date.toLocaleDateString('ko-KR')}</h4>
              <button class="danger" onclick="window.deleteWorkoutLog(${idx})">Delete</button>
            </div>
            <div class="workout-exercises">
              ${log.exercises.map(ex => `
                <div class="exercise-item">
                  <strong>${ex.name}</strong>
                  <div class="sets">
                    ${ex.sets.map((set, i) => `
                      <span class="set-badge">Set ${i + 1}: ${set.weight || '-'}kg × ${set.reps} reps</span>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');
    }
  } catch (e) {
    console.error(e);
    if (workoutList) {
      workoutList.innerHTML = `<div style="color: red;">Error: ${e.message}</div>`;
    }
  }
}

// 세트 추가 함수
function addSet() {
  const setsContainer = document.getElementById('setsContainer');
  if (!setsContainer) return;
  
  const setDiv = document.createElement('div');
  setDiv.className = 'set-input';
  setDiv.innerHTML = `
    <input type="number" class="set-weight" placeholder="Weight (kg)" />
    <input type="number" class="set-reps" placeholder="Reps" required />
    <button type="button" class="btn-danger" onclick="this.parentElement.remove()">Delete</button>
  `;
  setsContainer.appendChild(setDiv);
}

// 전역 이벤트 리스너 (한 번만 추가) - 함수 정의 후 추가
if (!window.workoutLogWalletListenerAdded) {
  window.addEventListener('walletConnected', () => {
    const workoutLogPage = document.getElementById('page-workout-log');
    if (workoutLogPage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });

  window.addEventListener('walletDisconnected', () => {
    const workoutLogPage = document.getElementById('page-workout-log');
    if (workoutLogPage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });
  window.workoutLogWalletListenerAdded = true;
}

// 전역에서 접근 가능하도록 함수를 window에 등록
window.workoutLogUpdatePageContent = updatePageContent;

export function initWorkoutLogPage() {
  updatePageContent();
  
  return {
    cleanup: () => {
      // 전역 이벤트는 제거하지 않음
    }
  };
}

// 전역 함수
window.addSet = addSet;
window.deleteWorkoutLog = async (idx) => {
  if (!confirm('Are you sure you want to delete this workout log?')) return;
  
  const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
  logs.splice(idx, 1);
  localStorage.setItem('workout_logs', JSON.stringify(logs));
  await loadWorkoutLogs();
};
