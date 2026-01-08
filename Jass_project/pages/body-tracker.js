import { getAccessToken } from '../config/api.js';

function updatePageContent() {
  if (!getAccessToken()) {
    const container = document.getElementById('bodyTrackerContainer');
    if (container) {
      container.innerHTML = '<div class="muted">Login is required.</div>';
    }
    
    // 체중 그래프 초기화
    const weightChart = document.getElementById('weightChart');
    if (weightChart) {
      const ctx = weightChart.getContext('2d');
      ctx.clearRect(0, 0, weightChart.width, weightChart.height);
    }
    
    // 체중 목록 초기화
    const weightList = document.getElementById('weightList');
    if (weightList) {
      weightList.innerHTML = '<div class="muted">Login is required.</div>';
    }
    
    // 사진 갤러리 초기화
    const photoGallery = document.getElementById('photoGallery');
    if (photoGallery) {
      photoGallery.innerHTML = '<div class="muted">Login is required.</div>';
    }
    
    return;
  }

  loadWeightData();
  loadPhotos();
  
  const form = document.getElementById('weightForm');
  if (form && !form.hasAttribute('data-listener-added')) {
    form.addEventListener('submit', handleWeightSubmit);
    form.setAttribute('data-listener-added', 'true');
  }
  
  const photoInput = document.getElementById('photoInput');
  if (photoInput && !photoInput.hasAttribute('data-listener-added')) {
    photoInput.addEventListener('change', handlePhotoUpload);
    photoInput.setAttribute('data-listener-added', 'true');
  }
}

// 전역 이벤트 리스너 (한 번만 추가) - 함수 정의 후 추가
if (!window.bodyTrackerWalletListenerAdded) {
  window.addEventListener('walletConnected', () => {
    const bodyTrackerPage = document.getElementById('page-body-tracker');
    if (bodyTrackerPage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });

  window.addEventListener('walletDisconnected', () => {
    const bodyTrackerPage = document.getElementById('page-body-tracker');
    if (bodyTrackerPage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });
  window.bodyTrackerWalletListenerAdded = true;
}

// 전역에서 접근 가능하도록 함수를 window에 등록
window.bodyTrackerUpdatePageContent = updatePageContent;

export function initBodyTrackerPage() {
  updatePageContent();
  
  return {
    cleanup: () => {
      // 전역 이벤트는 제거하지 않음
    }
  };
}

function loadWeightData() {
  const measurements = JSON.parse(localStorage.getItem('body_measurements') || '[]');
  
  if (measurements.length === 0) {
    const list = document.getElementById('weightList');
    if (list) {
      list.innerHTML = '<div class="muted">No weight data recorded.</div>';
    }
    return;
  }

  // 최근 30일 데이터로 그래프 그리기
  const recentData = measurements.slice(-30);
  renderWeightChart(recentData);
  
  // 목록 표시
  const list = document.getElementById('weightList');
  if (list) {
    list.innerHTML = measurements.slice().reverse().map((m, idx) => `
      <div class="weight-item">
        <div class="weight-date">${new Date(m.date).toLocaleDateString('ko-KR')}</div>
        <div class="weight-value">${m.weight}kg</div>
        ${m.bodyFat ? `<div class="weight-bodyfat">Body Fat: ${m.bodyFat}%</div>` : ''}
        ${m.muscle ? `<div class="weight-muscle">Muscle: ${m.muscle}kg</div>` : ''}
              <button class="danger" onclick="window.deleteWeightRecord(${measurements.length - 1 - idx})" style="font-size: 12px; padding: 4px 8px;">Delete</button>
      </div>
    `).join('');
  }
}

function renderWeightChart(data) {
  const canvas = document.getElementById('weightChart');
  if (!canvas || data.length === 0) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  ctx.clearRect(0, 0, width, height);

  // 최소/최대값 계산
  const weights = data.map(d => d.weight);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const range = maxWeight - minWeight || 1;

  // 그리드 라인
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
    
    const value = maxWeight - (range / 5) * i;
    ctx.fillStyle = '#666';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(value.toFixed(1) + 'kg', padding - 10, y + 4);
  }

  // 라인 그리기
  ctx.strokeStyle = '#007bff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  data.forEach((point, index) => {
    const x = padding + (chartWidth / (data.length - 1 || 1)) * index;
    const y = padding + chartHeight - ((point.weight - minWeight) / range) * chartHeight;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    // 점 그리기
    ctx.fillStyle = '#007bff';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  
  ctx.stroke();
}

function handleWeightSubmit(e) {
  e.preventDefault();
  
  const weight = parseFloat(document.getElementById('weightInput')?.value);
  const bodyFat = parseFloat(document.getElementById('bodyFatInput')?.value) || null;
  const muscle = parseFloat(document.getElementById('muscleInput')?.value) || null;
  
  if (!weight || weight <= 0) {
    alert('Please enter your weight.');
    return;
  }

  const measurements = JSON.parse(localStorage.getItem('body_measurements') || '[]');
  measurements.push({
    date: new Date().toISOString(),
    weight,
    bodyFat,
    muscle
  });
  
  localStorage.setItem('body_measurements', JSON.stringify(measurements));
  
  alert('Weight recorded successfully.');
  e.target.reset();
  loadWeightData();
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const fileNameEl = document.getElementById('photoFileName');
    if (fileNameEl) fileNameEl.textContent = file.name || 'No file selected';

  if (!file.type.startsWith('image/')) {
    alert('Only image files can be uploaded.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const photos = JSON.parse(localStorage.getItem('body_photos') || '[]');
    photos.push({
      date: new Date().toISOString(),
      image: event.target.result // base64
    });
    
    localStorage.setItem('body_photos', JSON.stringify(photos));
    loadPhotos();

    // 홈 체크리스트 갱신용
    window.dispatchEvent(new CustomEvent('bodyUpdated'));

    // 같은 파일 재선택 가능하게 초기화
    e.target.value = '';
    if (fileNameEl) fileNameEl.textContent = 'No file selected';
  };
  reader.readAsDataURL(file);
}

function loadPhotos() {
  const photos = JSON.parse(localStorage.getItem('body_photos') || '[]');
  const container = document.getElementById('photoGallery');
  
  if (!container) return;
  
  if (photos.length === 0) {
    container.innerHTML = '<div class="muted">No photos uploaded.</div>';
    return;
  }

  container.innerHTML = photos.slice().reverse().map((photo, idx) => `
    <div class="photo-item">
      <img src="${photo.image}" alt="Body photo" style="width: 100%; border-radius: 8px;" />
      <div class="photo-date">${new Date(photo.date).toLocaleDateString('ko-KR')}</div>
      <button class="danger" onclick="window.deletePhoto(${photos.length - 1 - idx})" style="font-size: 12px; padding: 4px 8px; margin-top: 8px;">Delete</button>
    </div>
  `).join('');
}

window.deleteWeightRecord = (idx) => {
  if (!confirm('Are you sure you want to delete this record?')) return;
  const measurements = JSON.parse(localStorage.getItem('body_measurements') || '[]');
  measurements.splice(idx, 1);
  localStorage.setItem('body_measurements', JSON.stringify(measurements));
  loadWeightData();
};

window.deletePhoto = (idx) => {
  if (!confirm('Are you sure you want to delete this photo?')) return;
  const photos = JSON.parse(localStorage.getItem('body_photos') || '[]');
  photos.splice(idx, 1);
  localStorage.setItem('body_photos', JSON.stringify(photos));
  loadPhotos();
};