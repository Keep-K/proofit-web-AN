
# 디자인 가이드## 파일 구조
styles/
├── design-system.css # 색상, 폰트, 간격 등 디자인 토큰 (가장 중요!)
├── base/ # 기본 스타일
│ ├── reset.css
│ └── typography.css
├── components/ # 재사용 가능한 컴포넌트
│ ├── buttons.css
│ ├── forms.css
│ ├── cards.css
│ └── navigation.css
├── layout/ # 레이아웃 관련
│ ├── header.css
│ └── grid.css
└── pages/ # 페이지별 스타일
├── home.css
├── chat.css
└── ...
## 디자인 수정 방법

### 1. 전체 색상 변경
→ `styles/design-system.css`의 `--color-primary` 등 수정

### 2. 버튼 스타일 변경
→ `styles/components/buttons.css` 수정

### 3. 특정 페이지만 변경
→ `styles/pages/[페이지명].css` 수정### 4. 폰트 변경→ `styles/design-system.css`의 `--font-family-base` 수정
