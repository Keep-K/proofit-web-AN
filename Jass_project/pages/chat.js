import { fetchJSON } from '../utils/api.js';

let sessionId = null;
let qaVersionId = null;

export function initChatPage() {
  const chatMessages = document.getElementById("chatMessages");
  // NOTE: 이 페이지는 라우팅으로 여러 번 init될 수 있어 리스너 중복을 방지해야 함
  // 이전에 addEventListener로 누적된 리스너까지 제거하기 위해 input/button을 클론으로 교체(리스너 초기화)
  let chatInput = document.getElementById("chatInput");
  let btnSend = document.getElementById("btnSend");
  if (chatInput?.parentNode) {
    const cloned = chatInput.cloneNode(true);
    chatInput.parentNode.replaceChild(cloned, chatInput);
    chatInput = cloned;
  }
  if (btnSend?.parentNode) {
    const cloned = btnSend.cloneNode(true);
    btnSend.parentNode.replaceChild(cloned, btnSend);
    btnSend = cloned;
  }
  const suggestions = document.getElementById("suggestions");

  // 메시지 추가 함수 - 아이폰 메시지 스타일
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    // 메시지 래퍼 생성
    const wrapperDiv = document.createElement("div");
    wrapperDiv.className = "message-wrapper";
    
    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = text;
    
    wrapperDiv.appendChild(contentDiv);
    messageDiv.appendChild(wrapperDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // 스크롤을 맨 아래로
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 10);
    
    return messageDiv;
  }

  // 타이핑 효과로 메시지 추가 - 아이폰 스타일
  function addTypingMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    // 메시지 래퍼 생성
    const wrapperDiv = document.createElement("div");
    wrapperDiv.className = "message-wrapper";
    
    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    wrapperDiv.appendChild(contentDiv);
    messageDiv.appendChild(wrapperDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // 타이핑 효과
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        contentDiv.textContent = text.slice(0, index + 1);
        setTimeout(() => {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 10);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // 30ms마다 한 글자씩
    
    return messageDiv;
  }

  // 로딩 인디케이터 추가 (생각중 메시지) - 아이폰 스타일
  function addLoadingMessage() {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message bot-message";
    messageDiv.id = "loadingMessage";
    
    // 메시지 래퍼 생성
    const wrapperDiv = document.createElement("div");
    wrapperDiv.className = "message-wrapper";
    
    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content loading-message";
    
    // 애니메이션 점들
    const dots = document.createElement("span");
    dots.className = "thinking-dots";
    dots.innerHTML = '<span></span><span></span><span></span>';
    
    contentDiv.appendChild(dots);
    wrapperDiv.appendChild(contentDiv);
    messageDiv.appendChild(wrapperDiv);
    
    chatMessages.appendChild(messageDiv);
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 10);
    
    return messageDiv;
  }

  // 로딩 메시지 제거
  function removeLoadingMessage() {
    const loading = document.getElementById("loadingMessage");
    if (loading) {
      loading.remove();
    }
  }

  // 제안 버튼 표시 - 이미지 스타일 (중앙 정렬 환영 화면)
  function showSuggestions(questions) {
    // 기존 환영 화면이 있으면 제거 (재진입 시 중복 방지)
    const existingWelcome = chatMessages.querySelector('.chat-welcome-container');
    if (existingWelcome) {
      existingWelcome.remove();
      chatMessages.classList.remove('has-welcome');
    }

    suggestions.innerHTML = "";
    
    // 메시지가 없을 때만 환영 화면 표시
    const hasMessages = chatMessages.querySelectorAll('.message').length > 0;
    
    if (!hasMessages) {
      // 환영 메시지 추가 (버블 없이 일반 텍스트)
      const welcomeContainer = document.createElement("div");
      welcomeContainer.className = "chat-welcome-container";
      
      const welcomeBubble = document.createElement("div");
      welcomeBubble.className = "welcome-message-bubble";
      welcomeBubble.textContent = "Hello! How can I help you?";
      
      welcomeContainer.appendChild(welcomeBubble);
      
      // 제안 버튼들을 환영 컨테이너 안에 추가 (가로 배치)
      const suggestionsContainer = document.createElement("div");
      suggestionsContainer.className = "welcome-suggestions";
      
      questions.slice(0, 4).forEach((q, index) => {
        const btn = document.createElement("button");
        btn.className = "welcome-suggestion-button";
        
        // 아이콘 추가
        const icon = document.createElement("span");
        icon.className = "suggestion-icon";
        const icons = ["💬", "📝", "💡"];
        icon.textContent = icons[index] || "💬";
        
        const text = document.createElement("span");
        text.textContent = q.question_text ?? q.questionText ?? "(question)";
        
        btn.appendChild(icon);
        btn.appendChild(text);
        
        btn.addEventListener("click", () => {
          // 환영 화면 제거
          const welcomeContainer = chatMessages.querySelector('.chat-welcome-container');
          if (welcomeContainer) {
            welcomeContainer.remove();
            chatMessages.classList.remove('has-welcome');
            chatMessages.style.padding = '24px';
          }
          sendMessage(q.question_text ?? q.questionText);
        });
        
        suggestionsContainer.appendChild(btn);
      });
      
      welcomeContainer.appendChild(suggestionsContainer);
      chatMessages.appendChild(welcomeContainer);
      
      // 환영 화면이 있을 때 클래스 추가
      chatMessages.classList.add('has-welcome');
    } else {
      // 메시지가 있을 때는 하단에 제안 버튼 표시
      questions.slice(0, 4).forEach((q, index) => {
        const btn = document.createElement("button");
        btn.className = "suggestion-button";
        
        const icon = document.createElement("span");
        icon.className = "suggestion-icon";
        const icons = ["💬", "📝", "💡", "❓"];
        icon.textContent = icons[index] || "💬";
        
        const text = document.createElement("span");
        text.textContent = q.question_text ?? q.questionText ?? "(question)";
        
        btn.appendChild(icon);
        btn.appendChild(text);
        
        btn.addEventListener("click", () => {
          sendMessage(q.question_text ?? q.questionText);
        });
        
        suggestions.appendChild(btn);
      });
    }
  }

  async function ensureSession() {
    if (sessionId) return sessionId;
    const data = await fetchJSON("/chat/sessions", { 
      method: "POST", 
      body: JSON.stringify({}) 
    });
    sessionId = data.sessionId;
    qaVersionId = data.qaVersionId;
    return sessionId;
  }

  // 메시지 전송
  async function sendMessage(questionText) {
    if (!questionText || !questionText.trim()) return;

    // 환영 화면 제거
    const welcomeContainer = chatMessages.querySelector('.chat-welcome-container');
    if (welcomeContainer) {
      welcomeContainer.remove();
      chatMessages.classList.remove('has-welcome');
    }

    // 사용자 메시지 표시
    addMessage(questionText, true);
    
    // 입력 필드 초기화
    chatInput.value = "";
    
    // 제안 버튼 숨기기
    suggestions.innerHTML = "";

    try {
      // "생각중..." 메시지 표시
      addLoadingMessage();
      
      const sid = await ensureSession();
      
      // 질문 ID 찾기
      const qaData = await fetchJSON("/qa/items");
      const question = qaData.items.find(
        q => (q.question_text || q.questionText) === questionText
      );

      if (!question) {
        // 최소 딜레이 (생각하는 시간)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        removeLoadingMessage();
        addMessage("Coming Soon 🚀\n\nThis feature will be available soon. Please select one of the suggested questions below!", false);
        await loadQuestions();
        return;
      }
      
      // API 호출
      const turn = await fetchJSON("/chat/turns", {
        method: "POST",
        body: JSON.stringify({ sessionId: sid, qaItemId: question.id }),
      });

      // 최소 딜레이 (생각하는 시간) - 답변 길이에 따라 조절
      const answerLength = turn.answer.length;
      const minDelay = Math.max(1500, Math.min(3000, answerLength * 20)); // 1.5초 ~ 3초
      await new Promise(resolve => setTimeout(resolve, minDelay));

      // 로딩 제거
      removeLoadingMessage();
      
      // 타이핑 효과로 봇 응답 표시
      addTypingMessage(turn.answer, false);
      
      // 질문 목록 다시 로드하여 제안 버튼 표시
      await loadQuestions();
    } catch (e) {
      console.error(e);
      removeLoadingMessage();
      addMessage(`An error occurred: ${e?.message || String(e)}`, false);
    }
  }

  // Enter 키로 전송 (리스너 중복 방지: onkeydown/onclick 사용)
  if (chatInput) {
    chatInput.onkeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      btnSend?.click();
    }
    };
  }

  // Send 버튼 클릭
  if (btnSend) {
    btnSend.onclick = () => {
      const text = chatInput?.value?.trim();
    if (text) {
      sendMessage(text);
    }
    };
  }

  // 질문 목록 로드
  async function loadQuestions() {
    try {
      const data = await fetchJSON("/qa/items");
      qaVersionId = data.qaVersionId;
      
      // 제안 버튼 표시
      showSuggestions(data.items);
    } catch (e) {
      console.error(e);
    }
  }

  // 초기 로드
  loadQuestions().catch(console.error);

  // 라우터가 cleanup을 호출할 수 있도록 반환
  return {
    cleanup() {
      if (chatInput) chatInput.onkeydown = null;
      if (btnSend) btnSend.onclick = null;
    },
  };
}