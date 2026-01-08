import { fetchJSON } from '../utils/api.js';
import { getAccessToken as getToken } from '../config/api.js';

function updatePageContent() {
  const profileInfo = document.getElementById('profileInfo');
  const btnLoadProfile = document.getElementById('btnLoadProfile');
  const btnLoadSummary = document.getElementById('btnLoadSummary');
  const profileForm = document.getElementById('profileForm');

  if (!getToken()) {
    if (profileInfo) {
      profileInfo.innerHTML = '<div class="muted">로그인이 필요합니다.</div>';
    }
    
    // 프로필 폼 초기화
    const displayNameEl = document.getElementById('displayName');
    const timezoneEl = document.getElementById('timezone');
    const bioEl = document.getElementById('bio');
    const heightCmEl = document.getElementById('heightCm');
    const weightKgEl = document.getElementById('weightKg');
    
    if (displayNameEl) displayNameEl.value = '';
    if (timezoneEl) timezoneEl.value = 'Asia/Seoul';
    if (bioEl) bioEl.value = '';
    if (heightCmEl) heightCmEl.value = '';
    if (weightKgEl) weightKgEl.value = '';
    
    return;
  }

  async function loadProfile() {
    if (!getToken()) {
      if (profileInfo) {
        profileInfo.innerHTML = '<div class="muted">로그인이 필요합니다.</div>';
      }
      return;
    }

    try {
      const data = await fetchJSON('/me');
      const user = data.user;
      
      if (profileInfo) {
        profileInfo.innerHTML = `
          <div class="profile-section">
            <div><strong>Address:</strong> <code>${user.address}</code></div>
            <div class="profile-value"><strong>Display Name:</strong> ${user.display_name || 'Not set'}</div>
            <div class="profile-value"><strong>Timezone:</strong> ${user.timezone || 'Not set'}</div>
            <div class="profile-value"><strong>Bio:</strong> ${user.bio || 'Not set'}</div>
            <div class="profile-value"><strong>Height:</strong> ${user.height_cm ? user.height_cm + ' cm' : 'Not set'}</div>
            <div class="profile-value"><strong>Weight:</strong> ${user.weight_kg ? user.weight_kg + ' kg' : 'Not set'}</div>
            <div class="muted" style="margin-top: 8px;">Joined: ${new Date(user.created_at).toLocaleString('en-US')}</div>
          </div>
        `;
      }

      const displayNameEl = document.getElementById('displayName');
      const timezoneEl = document.getElementById('timezone');
      const bioEl = document.getElementById('bio');
      const heightCmEl = document.getElementById('heightCm');
      const weightKgEl = document.getElementById('weightKg');
      
      if (displayNameEl) displayNameEl.value = user.display_name || '';
      if (timezoneEl) timezoneEl.value = user.timezone || 'Asia/Seoul';
      if (bioEl) bioEl.value = user.bio || '';
      if (heightCmEl) heightCmEl.value = user.height_cm || '';
      if (weightKgEl) weightKgEl.value = user.weight_kg || '';
    } catch (e) {
      console.error(e);
      if (profileInfo) {
        profileInfo.innerHTML = `<div style="color: red;">Error: ${e.message}</div>`;
      }
    }
  }

  async function loadSummary() {
    if (!getToken()) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const data = await fetchJSON('/me/summary');
      alert(`Upcoming schedules: ${data.upcomingScheduled}\nCheck-ins in last 7 days: ${data.checkinsLast7Days}`);
    } catch (e) {
      alert(`오류: ${e.message}`);
    }
  }

  if (btnLoadProfile && !btnLoadProfile.hasAttribute('data-listener-added')) {
    btnLoadProfile.addEventListener('click', loadProfile);
    btnLoadProfile.setAttribute('data-listener-added', 'true');
  }

  if (btnLoadSummary && !btnLoadSummary.hasAttribute('data-listener-added')) {
    btnLoadSummary.addEventListener('click', loadSummary);
    btnLoadSummary.setAttribute('data-listener-added', 'true');
  }

  if (profileForm && !profileForm.hasAttribute('data-listener-added')) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!getToken()) {
        alert('Login is required.');
        return;
      }

      try {
        await fetchJSON('/me', {
          method: 'PUT',
          body: JSON.stringify({
            displayName: document.getElementById('displayName')?.value || undefined,
            timezone: document.getElementById('timezone')?.value || undefined,
            bio: document.getElementById('bio')?.value || undefined,
            heightCm: document.getElementById('heightCm')?.value ? parseInt(document.getElementById('heightCm').value) : undefined,
            weightKg: document.getElementById('weightKg')?.value ? parseFloat(document.getElementById('weightKg').value) : undefined,
          }),
        });

        alert('Profile updated successfully.');
        await loadProfile();
      } catch (e) {
        alert(`Error: ${e.message}`);
      }
    });
    profileForm.setAttribute('data-listener-added', 'true');
  }

  loadProfile();
}

// 전역 이벤트 리스너 (한 번만 추가) - 함수 정의 후 추가
if (!window.mypageWalletListenerAdded) {
  window.addEventListener('walletConnected', () => {
    const mypagePage = document.getElementById('page-mypage');
    if (mypagePage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });

  window.addEventListener('walletDisconnected', () => {
    const mypagePage = document.getElementById('page-mypage');
    if (mypagePage) {
      // 페이지가 active이거나 곧 active가 될 수 있으므로 항상 업데이트
      updatePageContent();
    }
  });
  window.mypageWalletListenerAdded = true;
}

// 전역에서 접근 가능하도록 함수를 window에 등록
window.mypageUpdatePageContent = updatePageContent;

export function initMypagePage() {
  updatePageContent();
  
  return {
    cleanup: () => {
      // 전역 이벤트는 제거하지 않음
    }
  };
}
