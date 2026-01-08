# Proofit Frontend (Demo UI)

정적(Static) 데모 UI입니다.
- 고정 Q&A 테스트
- MetaMask 지갑 연결 + SIWE 서명 로그인(원클릭)

이 프론트는 기본적으로 백엔드를 `http://localhost:4000`으로 호출합니다.

---

## 1) 실행

```bash
npm install
npm run dev
```

접속: `http://localhost:5173`

---

## 2) API Base 변경(필요 시)

기본값은 `http://localhost:4000` 입니다.

환경에 따라 백엔드 주소를 바꿔야 한다면 브라우저 콘솔에서 아래처럼 설정할 수 있습니다.

```js
localStorage.setItem('PROOFIT_API_BASE', 'http://<BACKEND_HOST>:4000')
location.reload()
```

---

## 3) 주의사항

- MetaMask 팝업이 안 뜨는 경우:
  - MetaMask가 잠금 상태인지 확인(Unlocked)
  - MetaMask에 pending 요청이 쌓인 경우가 많으니 확장 아이콘을 눌러 승인/취소
  - Rabby/OKX 등 다른 지갑 확장과 충돌 가능 → 테스트 중에는 MetaMask만 켜기 권장

- SIWE는 데모 수준 검증입니다(운영에서는 domain/uri whitelist, nonce store를 Redis/DB로 이관 권장).
