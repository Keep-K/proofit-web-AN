import { app, analytics } from './firebase.js';
import { initRouter } from './components/navigation.js';
import { initChatPage } from './pages/chat.js';
import { initPlannerPage } from './pages/planner.js';
import { initMypagePage } from './pages/mypage.js';
import { connectWallet, signInWithWallet } from './utils/wallet.js';
import { getAccessToken, removeAccessToken } from './config/api.js';
import { initHomePage } from './pages/home.js';
import { initWorkoutLogPage } from './pages/workout-log.js';
import { initStatsPage } from './pages/stats.js';
import { initBodyTrackerPage } from './pages/body-tracker.js';
import { initNutritionPage } from './pages/nutrition.js';

// DOM이 로드된 후 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  const btnWallet = document.getElementById("btnWallet");
  const walletStatus = document.getElementById("walletStatus");

  // 지갑 관련 기능 초기화 (요소가 있는 경우에만)
  if (btnWallet && walletStatus) {
    // 로딩 오버레이 표시/숨김 함수
    function showLoadingOverlay() {
      const overlay = document.getElementById('walletLoadingOverlay');
      if (overlay) {
        overlay.style.display = 'flex';
      }
    }

    function hideLoadingOverlay() {
      const overlay = document.getElementById('walletLoadingOverlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }

    // 지갑 연결 해제
    function disconnectWallet() {
      // 로딩 오버레이 표시
      showLoadingOverlay();
      
      removeAccessToken();
      updateWalletButton();
      if (walletStatus) {
        walletStatus.textContent = "Not signed in";
      }
      // 지갑 연결 해제 이벤트 발생 (모든 페이지 업데이트용)
      window.dispatchEvent(new CustomEvent('walletDisconnected'));
      
      // 홈 화면으로 리다이렉트
      const currentPath = window.location.pathname;
      if (currentPath !== '/' && currentPath !== '/home') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      
      // 로딩 화면을 잠시 보여준 후 페이지 새로고침
      setTimeout(() => {
        hideLoadingOverlay();
        // 페이지 새로고침으로 모든 데이터를 확실히 초기화
        window.location.reload();
      }, 500);
    }

    // 지갑 연결
    async function connectWalletHandler() {
      try {
        // 로딩 오버레이 표시
        showLoadingOverlay();
        
        const address = await connectWallet();
        await signInWithWallet(address);
        
        updateWalletButton();
        
        if (walletStatus) {
          walletStatus.textContent = 'Connected';
        }
        
        // 토큰이 저장되었는지 확인하고 이벤트 발생
        // 약간의 딜레이를 두어 토큰이 확실히 저장되도록 함
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // 지갑 연결 성공 이벤트 발생 (모든 페이지 업데이트용)
        window.dispatchEvent(new CustomEvent('walletConnected'));
        
        // 로딩 화면을 잠시 보여준 후 페이지 새로고침
        setTimeout(() => {
          hideLoadingOverlay();
          // 페이지 새로고침으로 모든 데이터를 확실히 로드
          window.location.reload();
        }, 800);
      } catch (e) {
        // 에러 발생 시 로딩 숨김
        hideLoadingOverlay();
        
        console.error(e);
        if (e?.code === -32002) {
          alert("MetaMask connection request is already pending.\nPlease click the MetaMask icon in the top right to approve/cancel.");
        } else if (e?.code === 4001) {
          alert("User rejected the connection/signature request.");
        } else if (e?.message && e.message.includes('Solana')) {
          alert("Solana wallet is not supported.\nPlease use MetaMask.");
        } else {
          alert(`Error: ${e.message || String(e)}`);
        }
      }
    }

    // 버튼 클릭 이벤트
    btnWallet.addEventListener("click", async (e) => {
      e.stopPropagation();
      const isConnected = !!getAccessToken();
      
      if (isConnected) {
        disconnectWallet();
      } else {
        await connectWalletHandler();
      }
    });

    function updateWalletButton() {
      const isConnected = !!getAccessToken();
      
      if (isConnected) {
        btnWallet.innerHTML = 'Disconnect';
        btnWallet.classList.add('connected');
        btnWallet.disabled = false;
      } else {
        btnWallet.innerHTML = 'Connect Wallet';
        btnWallet.classList.remove('connected');
        btnWallet.disabled = false;
      }
    }

    updateWalletButton();

    // 지갑 상태 확인
    if (walletStatus) {
      if (getAccessToken()) {
        walletStatus.textContent = "JWT loaded (localStorage)";
      } else {
        walletStatus.textContent = "Not signed in";
      }
    }
  } else {
    console.warn("Wallet-related DOM elements not found.");
  }

  // 페이지 초기화 함수들
  const pageInitializers = {
    home: initHomePage,
    chat: initChatPage,
    stats: initStatsPage,
    'body-tracker': initBodyTrackerPage,
    nutrition: initNutritionPage,
    'workout-log': initWorkoutLogPage,
    mypage: initMypagePage,
    planner: initPlannerPage,
  };

  let currentPage = null;

  // 라우터 초기화
  const router = initRouter((pageName) => {
    if (currentPage && currentPage.cleanup) {
      currentPage.cleanup();
    }

    const initializer = pageInitializers[pageName];
    if (initializer) {
      currentPage = initializer();
    }
  });
}