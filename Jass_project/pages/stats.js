import { getAccessToken } from '../config/api.js';

function updatePageContent() {
  if (!getAccessToken()) {
    const container = document.getElementById('statsContainer');
    if (container) {
      container.innerHTML = '<div class="muted">Login is required.</div>';
    }
    
    // 차트 초기화
    const weeklyChart = document.getElementById('weeklyChart');
    const monthlyChart = document.getElementById('monthlyChart');
    const completionChart = document.getElementById('completionChart');
    if (weeklyChart) {
      const ctx = weeklyChart.getContext('2d');
      ctx.clearRect(0, 0, weeklyChart.width, weeklyChart.height);
    }
    if (monthlyChart) {
      const ctx = monthlyChart.getContext('2d');
      ctx.clearRect(0, 0, monthlyChart.width, monthlyChart.height);
    }
    if (completionChart) {
      const ctx = completionChart.getContext('2d');
      ctx.clearRect(0, 0, completionChart.width, completionChart.height);
    }
    
    // 원형 프로그레스 초기화
    const totalCircle = document.getElementById('totalWorkoutsCircle');
    const completionCircle = document.getElementById('completionRateCircle');
    const monthlyCircle = document.getElementById('monthlyWorkoutsCircle');
    if (totalCircle) {
      const circumference = 2 * Math.PI * 45;
      totalCircle.style.strokeDashoffset = circumference;
    }
    if (completionCircle) {
      const circumference = 2 * Math.PI * 45;
      completionCircle.style.strokeDashoffset = circumference;
    }
    if (monthlyCircle) {
      const circumference = 2 * Math.PI * 45;
      monthlyCircle.style.strokeDashoffset = circumference;
    }
    
    // 통계 값 초기화
    const totalEl = document.getElementById('statTotalWorkouts');
    const rateEl = document.getElementById('statCompletionRate');
    const monthlyEl = document.getElementById('statMonthlyWorkouts');
    if (totalEl) totalEl.textContent = '0';
    if (rateEl) rateEl.textContent = '0%';
    if (monthlyEl) monthlyEl.textContent = '0';
    
    return;
  }

  renderCharts();
  updateStats();
}

// 전역 이벤트 리스너 (한 번만 추가)
if (!window.statsWalletListenerAdded) {
  window.addEventListener('walletConnected', () => {
    const statsPage = document.getElementById('page-stats');
    if (statsPage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });

  window.addEventListener('walletDisconnected', () => {
    const statsPage = document.getElementById('page-stats');
    if (statsPage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });
  window.statsWalletListenerAdded = true;
}

// 전역에서 접근 가능하도록 함수를 window에 등록
window.statsUpdatePageContent = updatePageContent;

export function initStatsPage() {
  updatePageContent();
  
  return {
    cleanup: () => {
      // 전역 이벤트는 제거하지 않음
    }
  };
}

function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function resizeCanvasToDisplaySize(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.round(rect.width * dpr);
  const height = Math.round(rect.height * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext('2d');
  // CSS px 단위로 그리기 위해 스케일 고정
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

function renderCharts() {
  renderWeeklyChart();
  renderMonthlyChart();
  renderCompletionRate();
}

function renderWeeklyChart() {
  const canvas = document.getElementById('weeklyChart');
  if (!canvas) return;

  const ctx = resizeCanvasToDisplaySize(canvas);
  const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
  
  // 이번 주 데이터
  const weekDates = getWeekDates();
  const weekData = Array(7).fill(0);
  
  logs.forEach(log => {
    const logDate = new Date(log.date);
    if (logDate >= weekDates.start && logDate <= weekDates.end) {
      const dayIndex = logDate.getDay();
      weekData[dayIndex] = (weekData[dayIndex] || 0) + 1;
    }
  });

  drawBarChart(ctx, canvas, weekData, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
}

function renderMonthlyChart() {
  const canvas = document.getElementById('monthlyChart');
  if (!canvas) return;

  const ctx = resizeCanvasToDisplaySize(canvas);
  const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
  
  // 이번 달 데이터 (4주)
  const monthData = Array(4).fill(0);
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  
  logs.forEach(log => {
    const logDate = new Date(log.date);
    if (logDate.getMonth() === now.getMonth() && logDate.getFullYear() === now.getFullYear()) {
      const weekIndex = Math.floor((logDate.getDate() - 1) / 7);
      if (weekIndex < 4) {
        monthData[weekIndex] = (monthData[weekIndex] || 0) + 1;
      }
    }
  });

  drawBarChart(ctx, canvas, monthData, ['1주', '2주', '3주', '4주']);
}

function renderCompletionRate() {
  const canvas = document.getElementById('completionChart');
  if (!canvas) return;

  const plannerItems = JSON.parse(localStorage.getItem('planner_items') || '[]');
  const total = plannerItems.length;
  const completed = plannerItems.filter(item => item.status === 'done').length;
  const scheduled = plannerItems.filter(item => item.status === 'scheduled').length;
  const skipped = plannerItems.filter(item => item.status === 'skipped').length;

  const ctx = resizeCanvasToDisplaySize(canvas);
  const data = [
    { label: 'Done', value: completed, color: cssVar('--color-success', '#20C997') },
    { label: 'Scheduled', value: scheduled, color: cssVar('--color-primary', '#3182F6') },
    { label: 'Skipped', value: skipped, color: cssVar('--color-warning', '#FFB800') },
  ];
  drawPieChart(ctx, canvas, data);
  renderLegend(data);
}

function drawBarChart(ctx, canvas, data, labels) {
  // ctx는 CSS px 기준으로 스케일됨
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const paddingX = 24;
  const paddingTop = 12;
  const paddingBottom = 28;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;
  const barWidth = chartWidth / data.length;
  const maxValue = Math.max(...data, 1);

  ctx.clearRect(0, 0, width, height);
  
  const colorBar = cssVar('--color-primary', '#3182F6');
  const colorGrid = cssVar('--color-border-light', '#F2F4F6');
  const colorText = cssVar('--color-text-secondary', '#4E5968');
  const colorValue = cssVar('--color-text-primary', '#191F28');
  const fontBase = cssVar('--font-family-base', 'system-ui, sans-serif');

  // 가이드 라인 (3개)
  ctx.strokeStyle = colorGrid;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 2; i++) {
    const y = paddingTop + (chartHeight / 2) * i;
    ctx.beginPath();
    ctx.moveTo(paddingX, y);
    ctx.lineTo(width - paddingX, y);
    ctx.stroke();
  }

  // 바 그리기
  data.forEach((value, index) => {
    const barHeight = (value / maxValue) * chartHeight;
    const x = paddingX + index * barWidth + barWidth * 0.16;
    const y = paddingTop + chartHeight - barHeight;
    const w = barWidth * 0.68;

    ctx.fillStyle = colorBar;
    // 라운드 바
    const r = 8;
    ctx.beginPath();
    ctx.moveTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, paddingTop + chartHeight);
    ctx.lineTo(x, paddingTop + chartHeight);
    ctx.closePath();
    ctx.fill();
    
    // 값 표시
    if (value > 0) {
      ctx.fillStyle = colorValue;
      ctx.font = `600 12px ${fontBase}`;
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + w / 2, Math.max(14, y - 6));
    }
    
    // 라벨
    ctx.fillStyle = colorText;
    ctx.font = `500 12px ${fontBase}`;
    ctx.textAlign = 'center';
    ctx.fillText(labels[index], x + w / 2, height - 8);
  });
}

function drawPieChart(ctx, canvas, data) {
  const rect = canvas.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const radius = Math.min(centerX, centerY) - 18;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) {
    ctx.fillStyle = cssVar('--color-text-muted', '#8B95A1');
    ctx.font = `600 14px ${cssVar('--font-family-base', 'system-ui, sans-serif')}`;
    ctx.textAlign = 'center';
    ctx.fillText('No data available', centerX, centerY);
    return;
  }

  let currentAngle = -Math.PI / 2;
  
  data.forEach((item) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = item.color;
    ctx.fill();
    
    currentAngle += sliceAngle;
  });

  // 중앙 도넛(가독성)
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.62, 0, Math.PI * 2);
  ctx.fillStyle = cssVar('--color-bg-secondary', '#F7F8FA');
  ctx.fill();
}

function renderLegend(data) {
  const el = document.getElementById('completionLegend');
  if (!el) return;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  el.innerHTML = data
    .map((item) => {
      const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
      return `
        <div class="legend-item">
          <div class="legend-left">
            <span class="legend-dot" style="background:${item.color}"></span>
            <span class="legend-label">${item.label}</span>
          </div>
          <div class="legend-value">${item.value} (${pct}%)</div>
        </div>
      `;
    })
    .join('');
}

function updateStats() {
  const logs = JSON.parse(localStorage.getItem('workout_logs') || '[]');
  const plannerItems = JSON.parse(localStorage.getItem('planner_items') || '[]');
  
  // 총 운동 횟수
  const totalWorkouts = logs.length;
  
  // 완료율
  const completed = plannerItems.filter(item => item.status === 'done').length;
  const completionRate = plannerItems.length > 0 ? Math.round((completed / plannerItems.length) * 100) : 0;
  
  // 이번 달 운동 횟수
  const now = new Date();
  const monthlyWorkouts = logs.filter(log => {
    const logDate = new Date(log.date);
    return logDate.getMonth() === now.getMonth() && logDate.getFullYear() === now.getFullYear();
  }).length;
  
  // 목표값 (총 운동 횟수는 최대 100으로 정규화, 이번 달은 최대 30으로)
  const maxTotalWorkouts = 100;
  const maxMonthlyWorkouts = 30;
  const totalWorkoutsPercent = Math.min(100, (totalWorkouts / maxTotalWorkouts) * 100);
  const monthlyWorkoutsPercent = Math.min(100, (monthlyWorkouts / maxMonthlyWorkouts) * 100);
  
  // 총 운동 횟수 원형 프로그레스
  const totalCircle = document.getElementById('totalWorkoutsCircle');
  const totalEl = document.getElementById('statTotalWorkouts');
  if (totalCircle && totalEl) {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (totalWorkoutsPercent / 100) * circumference;
    totalCircle.style.strokeDashoffset = offset;
    totalEl.textContent = totalWorkouts;
  }
  
  // 완료율 원형 프로그레스
  const completionCircle = document.getElementById('completionRateCircle');
  const rateEl = document.getElementById('statCompletionRate');
  if (completionCircle && rateEl) {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (completionRate / 100) * circumference;
    completionCircle.style.strokeDashoffset = offset;
    
    // 색상 변경
    completionCircle.setAttribute('class', 'circular-progress-circle');
    if (completionRate >= 80) {
      completionCircle.classList.add('success');
    } else if (completionRate >= 50) {
      completionCircle.classList.add('warning');
    } else {
      completionCircle.classList.add('danger');
    }
    
    rateEl.textContent = `${completionRate}%`;
  }
  
  // 이번 달 운동 원형 프로그레스
  const monthlyCircle = document.getElementById('monthlyWorkoutsCircle');
  const monthlyEl = document.getElementById('statMonthlyWorkouts');
  if (monthlyCircle && monthlyEl) {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (monthlyWorkoutsPercent / 100) * circumference;
    monthlyCircle.style.strokeDashoffset = offset;
    
    // 색상 변경
    monthlyCircle.setAttribute('class', 'circular-progress-circle');
    if (monthlyWorkoutsPercent >= 80) {
      monthlyCircle.classList.add('success');
    } else if (monthlyWorkoutsPercent >= 50) {
      monthlyCircle.classList.add('warning');
    } else {
      monthlyCircle.classList.add('danger');
    }
    
    monthlyEl.textContent = monthlyWorkouts;
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