import { fetchJSON } from '../utils/api.js';
import { getAccessToken as getToken } from '../config/api.js';

let allPlannerItems = [];
let currentDate = new Date();
let selectedDate = null;

export function initPlannerPage() {
  const plannerItems = document.getElementById("plannerItems");
  const btnLoadPlanner = document.getElementById("btnLoadPlanner");
  const btnRefreshPlanner = document.getElementById("btnRefreshPlanner");
  const plannerForm = document.getElementById("plannerForm");
  const calendar = document.getElementById("calendar");
  const calendarMonthYear = document.getElementById("calendarMonthYear");
  const btnPrevMonth = document.getElementById("btnPrevMonth");
  const btnNextMonth = document.getElementById("btnNextMonth");
  const btnToday = document.getElementById("btnToday");
  const selectedDateHeader = document.getElementById("selectedDateHeader");
  const dateItemsList = document.getElementById("dateItemsList");

  if (!calendar || !calendarMonthYear) {
    console.error("Calendar elements not found.");
    return;
  }

  function navigateToPath(path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  function openWorkoutLogPrefill(dateStr, exerciseName) {
    try {
      localStorage.setItem('workout_log_prefill', JSON.stringify({ date: dateStr, exerciseName }));
    } catch (_) {
      // ignore
    }
    navigateToPath('/workout-log');
  }

  // 기본 선택 날짜: 오늘
  if (!selectedDate) {
    selectedDate = formatDate(new Date());
  }

  function formatKoreanDate(dateStr) {
    const d = new Date(`${dateStr}T00:00:00`);
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} (${week})`;
  }

  function setFormDate(dateStr) {
    const startAtEl = document.getElementById('plannerStartAt');
    const endAtEl = document.getElementById('plannerEndAt');
    if (!startAtEl) return;

    // datetime-local은 로컬 형식(YYYY-MM-DDTHH:mm)
    startAtEl.value = `${dateStr}T09:00`;
    if (endAtEl && !endAtEl.value) {
      endAtEl.value = `${dateStr}T09:45`;
    }
  }

  function selectDate(dateObj) {
    const dateStr = formatDate(dateObj);
    selectedDate = dateStr;
    currentDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    renderCalendar();
    showDateItems(dateStr);
    setFormDate(dateStr);
  }

  // 달력 렌더링
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    calendarMonthYear.textContent = `${month + 1}/${year}`;

    // 달력 그리드 초기화
    calendar.innerHTML = '';

    // 요일 헤더
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekDays.forEach(day => {
      const header = document.createElement('div');
      header.className = 'calendar-day-header';
      header.textContent = day;
      calendar.appendChild(header);
    });

    // 첫 번째 날의 요일
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    function renderDayCell(dateObj, isOtherMonth) {
      const day = document.createElement('div');
      const dateStr = formatDate(dateObj);
      day.className = 'calendar-day';
      if (isOtherMonth) day.classList.add('other-month');
      
      const today = new Date();
      if (dateObj.toDateString() === today.toDateString()) {
        day.classList.add('today');
      }
      if (selectedDate && dateStr === selectedDate) {
        day.classList.add('selected');
      }

      const dayNumber = document.createElement('div');
      dayNumber.className = 'calendar-day-number';
      dayNumber.textContent = String(dateObj.getDate());
      day.appendChild(dayNumber);

      const dayItems = allPlannerItems.filter(item => {
        const itemDate = new Date(item.start_at);
        return formatDate(itemDate) === dateStr;
      });

      if (dayItems.length > 0) {
        day.classList.add('has-items');
        const eventsDiv = document.createElement('div');
        eventsDiv.className = 'calendar-day-events';
        dayItems.slice(0, 4).forEach(item => {
          const dot = document.createElement('div');
          dot.className = `event-dot ${item.status}`;
          dot.title = item.title;
          eventsDiv.appendChild(dot);
        });
        day.appendChild(eventsDiv);
      }

      day.addEventListener('click', () => selectDate(dateObj));
      return day;
    }

    // 이전 달의 마지막 날들
    for (let i = firstDay - 1; i >= 0; i--) {
      const dateNum = daysInPrevMonth - i;
      const dateObj = new Date(year, month - 1, dateNum);
      calendar.appendChild(renderDayCell(dateObj, true));
    }

    // 현재 달의 날들
    for (let date = 1; date <= daysInMonth; date++) {
      const dateObj = new Date(year, month, date);
      calendar.appendChild(renderDayCell(dateObj, false));
    }

    // 다음 달의 첫 날들
    const remainingDays = 42 - (firstDay + daysInMonth);
    for (let date = 1; date <= remainingDays; date++) {
      const dateObj = new Date(year, month + 1, date);
      calendar.appendChild(renderDayCell(dateObj, true));
    }
  }

  // 날짜 포맷팅 (YYYY-MM-DD)
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 완료율 프로그레스 업데이트
  function updateCompletionProgress() {
    const total = allPlannerItems.length;
    const completed = allPlannerItems.filter(item => item.status === 'done').length;
    const scheduled = allPlannerItems.filter(item => item.status === 'scheduled').length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const circle = document.getElementById('plannerCompletionCircle');
    const valueEl = document.getElementById('plannerCompletionValue');
    const subtitleEl = document.getElementById('plannerCompletionSubtitle');
    
    if (circle && valueEl) {
      // 원주 = 2 * π * r = 2 * π * 45 ≈ 283
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (completionRate / 100) * circumference;
      
      circle.style.strokeDashoffset = offset;
      
      // 색상 변경
      circle.setAttribute('class', 'circular-progress-circle');
      if (completionRate >= 80) {
        circle.classList.add('success');
      } else if (completionRate >= 50) {
        circle.classList.add('warning');
      } else {
        circle.classList.add('danger');
      }
      
      valueEl.textContent = `${completionRate}%`;
      
      if (subtitleEl) {
        if (total === 0) {
          subtitleEl.textContent = 'No schedules';
        } else {
          subtitleEl.textContent = `Done: ${completed} / Total: ${total} (Scheduled: ${scheduled})`;
        }
      }
    }
  }

  // 선택한 날짜의 일정 표시
  function showDateItems(dateStr) {
    if (!dateItemsList) return;

    if (selectedDateHeader) {
      selectedDateHeader.textContent = formatKoreanDate(dateStr);
    }

    const dayItems = allPlannerItems.filter(item => {
      const itemDate = new Date(item.start_at);
      return formatDate(itemDate) === dateStr;
    });

    if (dayItems.length === 0) {
      dateItemsList.innerHTML = `
        <div class="muted">No schedules for this date.</div>
        <div style="margin-top: var(--spacing-sm);">
          <button class="btn-primary" type="button" onclick="document.getElementById('plannerTitle')?.focus()">Add schedule for this date</button>
        </div>
      `;
      return;
    }

    dateItemsList.innerHTML = dayItems.map(item => {
      const startAt = new Date(item.start_at);
      const endAt = item.end_at ? new Date(item.end_at) : null;
      const statusColors = {
        scheduled: '#007bff',
        done: '#28a745',
        skipped: '#ffc107',
        canceled: '#dc3545'
      };
      const statusLabels = {
        scheduled: 'Scheduled',
        done: 'Done',
        skipped: 'Skipped',
        canceled: 'Canceled'
      };

      return `
        <div class="date-item">
          <h5>${item.title}</h5>
          <div class="time">
            ${startAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            ${endAt ? ` - ${endAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` : ''}
          </div>
          ${item.notes ? `<div style="margin-top: 4px; color: #666; font-size: 14px;">${item.notes}</div>` : ''}
          <span class="status" style="background: ${statusColors[item.status] || '#666'}; color: white;">
            ${statusLabels[item.status] || item.status}
          </span>
          <div style="margin-top: 8px;">
            <button class="btn-secondary" style="font-size: 12px; padding: 4px 8px;" onclick="window.openWorkoutLogFromPlanner('${dateStr}', ${JSON.stringify(item.title)})">Log Workout</button>
            ${item.status === 'scheduled' ? `
              <button class="primary" style="font-size: 12px; padding: 4px 8px;" onclick="window.checkinPlannerItem('${item.id}')">Done</button>
            ` : ''}
            <button class="danger" style="font-size: 12px; padding: 4px 8px;" onclick="window.deletePlannerItem('${item.id}')">Delete</button>
          </div>
        </div>
      `;
    }).join('');
  }

  async function loadPlannerItems() {
    if (!getToken()) {
      // 지갑 해제 시 모든 데이터 초기화
      allPlannerItems = [];
      localStorage.removeItem('planner_items');
      
      // 달력 초기화
      renderCalendar();
      
      // 선택된 날짜의 일정 목록 초기화
      if (dateItemsList) {
        dateItemsList.innerHTML = '<div class="muted">Login is required.</div>';
      }
      
      // 완료율 프로그레스 초기화
      const circle = document.getElementById('plannerCompletionCircle');
      const valueEl = document.getElementById('plannerCompletionValue');
      const subtitleEl = document.getElementById('plannerCompletionSubtitle');
      if (circle && valueEl) {
        const circumference = 2 * Math.PI * 45;
        circle.style.strokeDashoffset = circumference;
        circle.setAttribute('class', 'circular-progress-circle');
        valueEl.textContent = '0%';
        if (subtitleEl) {
          subtitleEl.textContent = 'No schedules';
        }
      }
      
      if (plannerItems) {
        plannerItems.innerHTML = '<div class="muted">Login is required.</div>';
      }
      return;
    }

    try {
      const from = new Date();
      from.setDate(from.getDate() - 30); // 달력에 표시하기 위해 더 넓은 범위
      const to = new Date();
      to.setDate(to.getDate() + 60);

      const data = await fetchJSON(
        `/planner/items?from=${from.toISOString()}&to=${to.toISOString()}`
      );

      allPlannerItems = data.items || [];

      // localStorage에 저장 (홈 화면 통계용)
      localStorage.setItem('planner_items', JSON.stringify(allPlannerItems));

      // 홈 화면 통계 업데이트 이벤트 발생
      window.dispatchEvent(new CustomEvent('plannerUpdated'));

      // 완료율 프로그레스 업데이트
      updateCompletionProgress();

      // 달력 다시 렌더링
      renderCalendar();

      // 선택된 날짜가 있으면 해당 날짜의 일정 표시
      if (selectedDate) {
        showDateItems(selectedDate);
      }

      // 기존 목록 뷰 (있는 경우)
      if (plannerItems) {
        plannerItems.className = 'planner-items';
        if (allPlannerItems.length === 0) {
          plannerItems.innerHTML = '<div class="muted">No schedules.</div>';
          return;
        }

        plannerItems.innerHTML = allPlannerItems.map(item => {
          const startAt = new Date(item.start_at);
          const endAt = item.end_at ? new Date(item.end_at) : null;
          const statusColors = {
            scheduled: '#007bff',
            done: '#28a745',
            skipped: '#ffc107',
            canceled: '#dc3545'
          };
          const statusLabels = {
            scheduled: 'Scheduled',
            done: 'Done',
            skipped: 'Skipped',
            canceled: 'Canceled'
          };

          return `
            <div class="planner-item">
              <h4>${item.title}</h4>
              <div class="meta">
                <div>Start: ${startAt.toLocaleString('en-US')}</div>
                ${endAt ? `<div>End: ${endAt.toLocaleString('en-US')}</div>` : ''}
                <div>Status: <span style="color: ${statusColors[item.status] || '#666'}">${statusLabels[item.status] || item.status}</span></div>
                ${item.notes ? `<div style="margin-top: 8px;">${item.notes}</div>` : ''}
              </div>
              <div class="actions">
                ${item.status === 'scheduled' ? `
                  <button class="primary" onclick="window.checkinPlannerItem('${item.id}')">Mark Done</button>
                ` : ''}
                <button class="danger" onclick="window.deletePlannerItem('${item.id}')">Delete</button>
              </div>
            </div>
          `;
        }).join('');
      }

      // 전역 함수 등록
      window.openWorkoutLogFromPlanner = (dateStr, title) => {
        openWorkoutLogPrefill(dateStr, title);
      };

      window.checkinPlannerItem = async (id) => {
        try {
          await fetchJSON(`/planner/items/${id}/checkins`, {
            method: 'POST',
            body: JSON.stringify({}),
          });
          alert('Check-in completed!');
          await loadPlannerItems();
        } catch (e) {
          alert(`오류: ${e.message}`);
        }
      };

      window.deletePlannerItem = async (id) => {
        if (!confirm('Are you sure you want to delete this schedule?')) return;
        try {
          await fetchJSON(`/planner/items/${id}`, { method: 'DELETE' });
          alert('Schedule deleted successfully.');
          await loadPlannerItems();
        } catch (e) {
          alert(`오류: ${e.message}`);
        }
      };
    } catch (e) {
      console.error(e);
      if (plannerItems) {
        plannerItems.innerHTML = `<div style="color: red;">Error: ${e.message}</div>`;
      }
    }
  }

  // 월 이동
  btnPrevMonth?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  btnNextMonth?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  btnToday?.addEventListener('click', () => {
    const today = new Date();
    selectDate(today);
  });

  btnLoadPlanner?.addEventListener('click', loadPlannerItems);
  btnRefreshPlanner?.addEventListener('click', loadPlannerItems);

  plannerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!getToken()) {
      alert('Login is required.');
      return;
    }

    try {
      const title = document.getElementById('plannerTitle')?.value;
      const startAtInput = document.getElementById('plannerStartAt')?.value;
      const endAtInput = document.getElementById('plannerEndAt')?.value;

      if (!title || !startAtInput) {
        alert('Title and start time are required.');
        return;
      }

      const startAt = new Date(startAtInput);
      const endAt = endAtInput ? new Date(endAtInput) : new Date(startAt.getTime() + 45 * 60 * 1000); // 기본 45분

      await fetchJSON('/planner/items', {
        method: 'POST',
        body: JSON.stringify({
          title,
          startAt: startAt.toISOString(),
          endAt: endAt.toISOString(),
        }),
      });

      alert('Schedule added successfully.');
      plannerForm.reset();
      await loadPlannerItems();
    } catch (e) {
      console.error(e);
      alert(`오류: ${e.message}`);
    }
  });

  // 초기 렌더링
  renderCalendar();
  if (selectedDate) {
    showDateItems(selectedDate);
    setFormDate(selectedDate);
  }
  loadPlannerItems();

  // 지갑 연결/해제 시 업데이트 (전역 이벤트 리스너)
  const handleWalletEvent = () => {
    const plannerPage = document.getElementById('page-planner');
    if (plannerPage && plannerPage.classList.contains('active')) {
      loadPlannerItems();
    }
  };

  // 전역 이벤트 리스너 추가 (한 번만)
  if (!window.plannerWalletListenerAdded) {
    window.addEventListener('walletConnected', handleWalletEvent);
    window.addEventListener('walletDisconnected', handleWalletEvent);
    window.plannerWalletListenerAdded = true;
  }

  return { 
    loadPlannerItems,
    cleanup: () => {
      // 전역 이벤트는 제거하지 않음
    }
  };
}