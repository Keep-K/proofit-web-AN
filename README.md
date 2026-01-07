# Proofit Web

Next.js와 CSS로 만든 웹사이트 베이스입니다.

## 시작하기

먼저 의존성을 설치하세요:

```bash
npm install
```

개발 서버를 실행하세요:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 프로젝트 구조

```
proofit-web/
├── app/
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 홈 페이지
│   ├── globals.css     # 전역 CSS
│   └── proofit\...     # 기타 라우트
├── next.config.js      # Next.js 설정
├── package.json        # 프로젝트 의존성
└── tsconfig.json       # TypeScript 설정
```

## 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
```

빌드된 앱을 실행하려면:

```bash
npm start
```

