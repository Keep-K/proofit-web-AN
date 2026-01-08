export function initRouter(onPageChange) {
    const pages = {
      home: 'page-home',
      chat: 'page-chat',
      stats: 'page-stats',
      'body-tracker': 'page-body-tracker',
      nutrition: 'page-nutrition',
      'workout-log': 'page-workout-log',
      mypage: 'page-mypage',
      planner: 'page-planner',
    };
  
    // URL 경로와 페이지 이름 매핑 (Next.js /proofit 경로에 맞게 수정)
    const routeMap = {
      '/proofit': 'home',
      '/proofit/': 'home',
      '/proofit/home': 'home',
      '/proofit/chat': 'chat',
      '/proofit/stats': 'stats',
      '/proofit/body-tracker': 'body-tracker',
      '/proofit/nutrition': 'nutrition',
      '/proofit/workout-log': 'workout-log',
      '/proofit/mypage': 'mypage',
      '/proofit/planner': 'planner',
      // 하위 호환성을 위한 경로
      '/': 'home',
      '/home': 'home',
      '/chat': 'chat',
      '/stats': 'stats',
      '/body-tracker': 'body-tracker',
      '/nutrition': 'nutrition',
      '/workout-log': 'workout-log',
      '/mypage': 'mypage',
      '/planner': 'planner',
    };
  
    const navButtons = {
      home: document.getElementById('btnHome'),
      chat: document.getElementById('btnChat'),
      stats: document.getElementById('btnStats'),
      'body-tracker': document.getElementById('btnBodyTracker'),
      nutrition: document.getElementById('btnNutrition'),
      mypage: document.getElementById('btnMypage'),
      planner: document.getElementById('btnPlanner'),
    };
  
    // 모든 페이지 숨기기
    function hideAllPages() {
      Object.values(pages).forEach(pageId => {
        const page = document.getElementById(pageId);
        if (page) {
          page.classList.remove('active');
        }
      });
    }
  
    // 모든 버튼 비활성화
    function deactivateAllButtons() {
      Object.values(navButtons).forEach(btn => {
        if (btn) {
          btn.classList.remove('active');
        }
      });
    }
  
    // 페이지 이름을 URL 경로로 변환 (Next.js /proofit 경로에 맞게 수정)
    function getPathFromPageName(pageName) {
      if (pageName === 'home') return '/proofit';
      if (pageName === 'body-tracker') return '/proofit/body-tracker';
      if (pageName === 'workout-log') return '/proofit/workout-log';
      return `/proofit/${pageName}`;
    }
  
    // URL 경로에서 페이지 이름 추출
    function getPageNameFromPath(path) {
      return routeMap[path] || 'home';
    }
  
    // 페이지 전환 함수
    function navigateTo(pageName, pushState = true) {
      hideAllPages();
      deactivateAllButtons();
  
      const pageId = pages[pageName];
      const btn = navButtons[pageName];
  
      if (pageId) {
        const page = document.getElementById(pageId);
        if (page) {
          page.classList.add('active');
        }
      }
  
      if (btn) {
        btn.classList.add('active');
      }
  
      // URL 변경 (History API 사용)
      if (pushState) {
        const path = getPathFromPageName(pageName);
        window.history.pushState({ page: pageName }, '', path);
      }
  
      // 콜백 호출
      if (onPageChange) {
        onPageChange(pageName);
      }
    }
  
    // 버튼 이벤트 리스너 - 실제 URL 경로로 이동
    navButtons.home?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('home');
    });
    navButtons.chat?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('chat');
    });
    navButtons.stats?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('stats');
    });
    navButtons['body-tracker']?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('body-tracker');
    });
    navButtons.nutrition?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('nutrition');
    });
    navButtons.mypage?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('mypage');
    });
    navButtons.planner?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('planner');
    });
  
    // 초기 페이지 설정 - 현재 URL 경로에서 페이지 이름 추출
    const currentPath = window.location.pathname;
    const initialPage = getPageNameFromPath(currentPath);
    navigateTo(initialPage, false);
  
    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener('popstate', (e) => {
      const path = window.location.pathname;
      const pageName = getPageNameFromPath(path);
      navigateTo(pageName, false);
    });
  
    return { navigateTo };
  }