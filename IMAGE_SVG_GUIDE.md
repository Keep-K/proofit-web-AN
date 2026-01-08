# PROOFIT 웹사이트 이미지 SVG 생성 가이드

실제 웹사이트에서 사용되는 모든 이미지의 상세 스펙과 SVG 생성 가이드입니다.

---

## 📋 목차

1. [네비게이션](#1-네비게이션)
2. [Hero 섹션](#2-hero-섹션)
3. [Social Proof 섹션](#3-social-proof-섹션)
4. [Problem 섹션](#4-problem-섹션)
5. [CoreAI 섹션](#5-coreai-섹션)
6. [Integrity 섹션](#6-integrity-섹션)
7. [메타데이터 이미지](#7-메타데이터-이미지)
8. [SVG 생성 가이드라인](#svg-생성-가이드라인)

---

## 1. 네비게이션

### 로고 (Logo)

**파일명**: `logo.svg`  
**위치**: `/public/logo.svg`  
**현재 파일**: `logo.png` (1024x1024px)  
**표시 사이즈**: 36 x 36px

**사용 위치**: 
- 네비게이션 바 좌측 상단
- 파일: `components/landing/Nav.tsx` (line 45)

**SVG 스펙**:
- **viewBox**: `0 0 36 36` (표시 사이즈 기준)
- **스타일**: 미니멀리스트, 기하학적
- **색상**: Deep burnt orange (#C76E00) 또는 단색
- **컨셉**: 스타일화된 "P" 문자 또는 검증/체크마크 심볼
- **배경**: 투명 또는 warm beige (#f0eee6)
- **요구사항**: 작은 사이즈에서도 명확하고 읽기 쉬워야 함
- **다크모드 대응**: 밝은 배경과 어두운 배경 모두에서 작동해야 함

**디자인 가이드**:
- 연구 수준의 미학
- 전문적이고 신뢰할 수 있는 느낌
- 중앙 정렬, 단순한 디자인

---

## 2. Hero 섹션

### Hero Visual

**현재 상태**: Lottie 애니메이션 사용 중 (이미지 미사용)  
**Lottie 파일들**:
- `/public/lottie/Calender.json`
- `/public/lottie/SliderUI.json`
- `/public/lottie/FitnessGraph.json`

**표시 사이즈**: 
- 모바일: 최소 높이 280px
- 태블릿: 최소 높이 420px
- 데스크톱: 최소 높이 520px

**참고**: 현재는 이미지 대신 Lottie 애니메이션을 사용하므로 SVG 생성 불필요

---

## 3. Social Proof 섹션

### 파트너 로고 (Partner Logos)

**파일명**: 
- `partner-logo-1.svg`
- `partner-logo-2.svg`
- `partner-logo-3.svg`
- `partner-logo-5.svg` (4번은 사용 안 함)

**위치**: `/public/images/partners/`  
**현재 파일**: PNG (각 1024x1024px)  
**표시 사이즈**: 
- 모바일: 144px (너비) x 56px (높이)
- 데스크톱: 224px (너비) x 80px (높이)

**사용 위치**: 
- 파일: `components/landing/sections/SocialProof.tsx` (lines 28-32)
- 신뢰도 섹션에 4개 표시 (1, 2, 3, 5번만 사용)
- 무한 스크롤 애니메이션 (우에서 좌로)

**SVG 스펙**:
- **viewBox**: `0 0 224 80` (데스크톱 기준, 반응형으로 축소)
- **스타일**: 미니멀리스트, 전문적인 회사 로고
- **배경**: 투명 또는 흰색
- **색상**: 다양할 수 있으나 warm beige 배경에서 작동해야 함
- **요구사항**: 실제 회사/조직 로고처럼 보여야 함
- **예시 스타일**: 테크 회사, 건강 조직, 연구 기관
- **일관성**: 각 로고는 구별되지만 세트로 일관성 있어야 함
- **디자인**: 단순한 텍스트 기반 또는 아이콘 기반

**참고**: `partner-logo-4.svg`는 생성하지 않아도 됨 (코드에서 사용 안 함)

---

## 4. Problem 섹션

### Problem Illustration

**파일명**: `problem-illustration.svg`  
**위치**: `/public/images/problem-illustration.svg`  
**현재 파일**: PNG (1024x1024px)  
**표시 사이즈**: 
- 모바일: 최소 높이 220px
- 데스크톱: 최소 높이 280px
- 반응형 (너비는 컨테이너에 맞춤)

**사용 위치**: 
- 파일: `components/landing/sections/Problem.tsx` (line 19)
- Problem 섹션 좌측 카드 내부

**SVG 스펙**:
- **viewBox**: `0 0 600 400` (3:2 비율 권장)
- **스타일**: 에디토리얼, 다이어그램 형식, 연구 수준
- **배경**: Warm beige/cream (#f0eee6) 또는 흰색
- **색상 팔레트**: Warm beige, muted grays, deep burnt orange (#C76E00) 대비용
- **비주얼 컨셉**: 데이터가 사라지거나 검증되지 않는 문제 시각화
  - 사라지는/페이드되는 성능 지표
  - 신뢰할 수 없는 지표 vs 검증된 데이터 비교
  - 참여와 검증된 실행 간의 간격을 추상적으로 시각화
- **무드**: 문제를 설명하지만 부정적이지 않게 - 더 분석적
- **느낌**: 연구 논문의 다이어그램처럼
- **디자인**: 깔끔하고, 미니멀하며, 전문적

**설명**: PROOFIT이 해결하는 문제인 사라지는 건강 성능 데이터를 보여주는 일러스트레이션

---

## 5. CoreAI 섹션

### CoreAI 모듈 이미지 (4개)

**파일명**:
- `body-analysis.svg`
- `goal-planning.svg`
- `motion-correction.svg`
- `adaptive-optimization.svg`

**위치**: `/public/images/coreai/`  
**현재 파일**: PNG (각 1024x1024px)  
**표시 사이즈**: 최소 높이 180px (너비는 그리드에 맞춤)

**사용 위치**: 
- 파일: `components/landing/sections/CoreAI.tsx` (lines 6-9, 38)
- CoreAI 섹션의 각 모듈 카드 내부
- 그리드 레이아웃: 모바일 1열, 데스크톱 2열

**SVG 스펙 (공통)**:
- **viewBox**: `0 0 400 280` (각 모듈)
- **스타일**: 4개 모두 일관성 있게, 에디토리얼, 다이어그램 형식
- **배경**: Warm beige/cream (#f0eee6) 또는 흰색
- **색상 팔레트**: Warm beige, deep burnt orange (#C76E00) 액센트, subtle grays
- **느낌**: 연구 논문 다이어그램처럼, 미니멀, 깔끔, 전문적, 일관된 비주얼 언어

#### 5-1. Body Analysis AI

**컨셉**: 신체 신호 및 기준선 설정의 추상적 시각화
- 데이터 스트림, 신호, 기준선 측정
- 신체 모델과 신호를 나타내는 기하학적 패턴

#### 5-2. Goal Planning AI

**컨셉**: 목표 설정 및 계획의 시각화
- 목표, 제약 조건, 계획 구조
- "좋은 것이 무엇인가"의 추상적 표현

#### 5-3. Motion Correction AI

**컨셉**: 실시간 검증 및 수정의 시각화
- 자세 확인, 폼 검증, 피드백 루프
- 실행 품질 검증의 추상적 표현

#### 5-4. Adaptive Optimization AI

**컨셉**: 지속적인 개선 및 최적화의 시각화
- 트렌드, 조정, 최적화 루프
- 적응형 학습의 추상적 표현

---

## 6. Integrity 섹션

### Integrity Diagram

**파일명**: `integrity-diagram.svg`  
**위치**: `/public/images/integrity-diagram.svg`  
**현재 파일**: PNG (1024x1024px)  
**표시 사이즈**: 
- 모바일: 최소 높이 260px
- 태블릿: 최소 높이 320px
- 반응형 (너비는 컨테이너에 맞춤)

**사용 위치**: 
- 파일: `components/landing/sections/Integrity.tsx` (line 34)
- Integrity 섹션 좌측 카드 내부

**SVG 스펙**:
- **viewBox**: `0 0 800 500`
- **스타일**: 에디토리얼, 다이어그램 형식, 연구 수준
- **배경**: Warm beige/cream (#f0eee6) 또는 흰색
- **색상 팔레트**: Warm beige, 주요 요소는 deep burnt orange (#C76E00), subtle grays
- **비주얼 컨셉**: Integrity 검증 프로세스 표시
  - 검증 → integrity 체크 → 신뢰할 수 있는 성능의 플로우 다이어그램
  - 또는 사기 방지 및 이상 탐지 시각화
  - 또는 실행이 검증되고 누적 성능이 되는 방식을 보여주는 다이어그램
- **느낌**: 연구 논문의 기술 다이어그램처럼
- **디자인**: 깔끔한 선, 최소한의 장식, 전문적
- **컨셉**: "검증된, 누적 성능"의 개념을 보여줌

---

## 7. 메타데이터 이미지

### Open Graph 이미지

**파일명**: `og-image.svg` 또는 `og-image.png`  
**위치**: `/public/og-image.svg` (또는 PNG)  
**현재 파일**: PNG (1536x1024px)  
**목표 사이즈**: 1200 x 630px

**사용 위치**: 
- 파일: `app/layout.tsx` (lines 36, 48)
- 소셜 미디어 공유용 메타 태그

**SVG 스펙**:
- **viewBox**: `0 0 1200 630`
- **스타일**: Anthropic.com-inspired, 연구 수준의 미학
- **배경**: Warm beige/cream (#f0eee6)
- **색상 팔레트**: 
  - 배경: Warm beige
  - 액센트: Deep burnt orange (#C76E00)
  - 텍스트: Near-black (#161616)
- **레이아웃**: 
  - 좌측: "PROOFIT" 워드마크 (deep burnt orange)
  - 우측: 검증된 성능 누적의 추상적 시각화 (기하학적 도형 또는 데이터 시각화 요소)
- **타이포그래피**: 깔끔하고 현대적인 sans-serif
- **무드**: 차분하고, 신뢰할 수 있으며, 연구 중심적, 프리미엄
- **요구사항**: 사람 없음, 최소한의 장식, 타이포그래피와 미묘한 비주얼 요소에 집중
- **텍스트**: "PROOFIT"을 눈에 띄게 표시, 부제목 "Verified performance that accumulates"를 더 작은 텍스트로
- **느낌**: 에디토리얼, 과학적, 신뢰할 수 있으며, 연구 논문이나 학술 출판물처럼

**참고**: SVG로 만들 경우 텍스트는 `<text>` 요소로 포함하거나, PNG로 내보내기 필요 (일부 소셜 미디어 플랫폼은 SVG를 지원하지 않을 수 있음)

### Apple Touch Icon

**파일명**: `apple-touch-icon.svg` 또는 `apple-touch-icon.png`  
**위치**: `/public/apple-touch-icon.svg` (또는 PNG)  
**현재 파일**: PNG (1024x1024px)  
**목표 사이즈**: 180 x 180px

**사용 위치**: 
- 파일: `app/layout.tsx` (line 63)
- iOS 홈 화면 아이콘

**SVG 스펙**:
- **viewBox**: `0 0 180 180`
- **스타일**: 깔끔하고 현대적인 아이콘 디자인
- **배경**: Deep burnt orange (#C76E00) 또는 warm beige (#f0eee6) with burnt orange accent
- **아이콘**: 스타일화된 "P" 또는 추상적 검증 심볼
- **요구사항**: iOS 홈 화면에서 잘 작동해야 함
- **디자인**: 전문적이고 프리미엄한 외관
- **형식**: 정사각형 (iOS가 자동으로 둥근 모서리 적용)
- **스타일**: 미니멀리스트, 기하학적, 인식 가능

**참고**: SVG로 만들 경우 PNG로도 내보내기 권장 (iOS 호환성)

### Favicon

**파일명**: `favicon.ico`  
**위치**: `/public/favicon.ico`  
**현재 상태**: 파일 없음 (생성 필요)

**사이즈**: 32 x 32px (또는 16x16, 48x48 포함된 ICO 파일)  
**형식**: ICO (다중 해상도 포함)

**SVG 스펙** (ICO 변환 전):
- **viewBox**: `0 0 32 32`
- **스타일**: 단순하고, 기하학적, 작은 사이즈에서도 인식 가능
- **색상**: Deep burnt orange (#C76E00) on 투명 또는 warm beige 배경
- **컨셉**: 검증/체크마크의 추상적 표현, 또는 스타일화된 "P" 문자
- **요구사항**: 16x16px에서도 읽기 쉽고 명확해야 함
- **디자인**: 최소한의 디테일, 굵은 형태, 전문적이고 신뢰할 수 있는 외관

**참고**: SVG로 디자인 후 ICO 형식으로 변환 필요 (온라인 변환 도구 사용)

---

## SVG 생성 가이드라인

### 공통 디자인 원칙

#### 색상 팔레트
- **배경**: `#f0eee6` (warm beige/cream)
- **액센트**: `#C76E00` (deep burnt orange)
- **텍스트**: `#161616` (near-black)
- **보조**: `#5F6368` (warm gray)

#### 스타일
- **에스테틱**: Anthropic.com-inspired editorial aesthetic
- **느낌**: 연구 수준, 과학적
- **디자인**: 미니멀, 깔끔, 전문적
- **제외**: 스톡 사진 없음, 사람 없음
- **집중**: 추상적 시각화, 다이어그램, 기하학적 패턴

#### 무드
- 차분하고, 신뢰할 수 있으며, 프리미엄
- 연구 논문이나 학술 출판물처럼
- 에디토리얼, 마케팅 중심이 아님

### SVG 기술 가이드

#### 기본 구조
```svg
<svg viewBox="0 0 [width] [height]" xmlns="http://www.w3.org/2000/svg">
  <!-- 배경 (선택사항) -->
  <rect width="100%" height="100%" fill="#f0eee6"/>
  
  <!-- 컨텐츠 -->
  <!-- ... -->
</svg>
```

#### 반응형 대응
- `viewBox` 속성 사용 (고정 width/height 대신)
- CSS에서 `width: 100%`, `height: auto` 설정
- 또는 Next.js Image 컴포넌트와 함께 사용 시 `fill` prop 사용

#### 최적화 팁
1. **불필요한 요소 제거**: 사용하지 않는 그룹, 레이어 제거
2. **경로 최적화**: Simplify paths, remove hidden elements
3. **그라디언트 최소화**: 가능하면 단색 사용
4. **텍스트 처리**: 
   - 텍스트가 포함된 경우 `<text>` 요소 사용
   - 또는 텍스트를 경로로 변환 (더 큰 파일 크기)
5. **파일 크기**: 가능하면 50KB 이하로 유지

#### 접근성
- `title` 및 `desc` 요소 추가
- 의미 있는 `alt` 텍스트 (코드에서 사용)

### 파일 구조

```
/public/
  ├── logo.svg
  ├── apple-touch-icon.svg (또는 .png)
  ├── og-image.svg (또는 .png)
  ├── favicon.ico
  └── images/
      ├── problem-illustration.svg
      ├── integrity-diagram.svg
      ├── coreai/
      │   ├── body-analysis.svg
      │   ├── goal-planning.svg
      │   ├── motion-correction.svg
      │   └── adaptive-optimization.svg
      └── partners/
          ├── partner-logo-1.svg
          ├── partner-logo-2.svg
          ├── partner-logo-3.svg
          └── partner-logo-5.svg
```

### 변환 및 내보내기

#### SVG → PNG 변환 (필요시)
- Figma: Export → PNG 선택
- Illustrator: File → Export → PNG
- 온라인 도구: CloudConvert, Convertio 등

#### SVG → ICO 변환 (Favicon)
- 온라인 도구: RealFaviconGenerator, Favicon.io
- 또는 ImageMagick: `convert favicon.svg -resize 32x32 favicon.ico`

### Next.js 사용 시 주의사항

1. **SVG import**: 
   ```tsx
   import Logo from '/public/logo.svg'
   // 또는
   <Image src="/logo.svg" alt="PROOFIT" width={36} height={36} />
   ```

2. **인라인 SVG**: 
   ```tsx
   import { ReactComponent as Logo } from '/public/logo.svg'
   ```

3. **최적화**: Next.js는 자동으로 SVG를 최적화하지 않으므로, 생성 시 최적화된 SVG를 만드는 것이 좋음

---

## 체크리스트

### 생성해야 할 SVG 파일

- [ ] `logo.svg` (36x36 viewBox)
- [ ] `apple-touch-icon.svg` (180x180 viewBox)
- [ ] `og-image.svg` (1200x630 viewBox)
- [ ] `favicon.ico` (32x32, SVG에서 변환)
- [ ] `images/problem-illustration.svg` (600x400 viewBox)
- [ ] `images/integrity-diagram.svg` (800x500 viewBox)
- [ ] `images/coreai/body-analysis.svg` (400x280 viewBox)
- [ ] `images/coreai/goal-planning.svg` (400x280 viewBox)
- [ ] `images/coreai/motion-correction.svg` (400x280 viewBox)
- [ ] `images/coreai/adaptive-optimization.svg` (400x280 viewBox)
- [ ] `images/partners/partner-logo-1.svg` (224x80 viewBox)
- [ ] `images/partners/partner-logo-2.svg` (224x80 viewBox)
- [ ] `images/partners/partner-logo-3.svg` (224x80 viewBox)
- [ ] `images/partners/partner-logo-5.svg` (224x80 viewBox)

### 생성하지 않아도 되는 파일

- ❌ `hero-visual.svg` (Lottie 애니메이션 사용 중)
- ❌ `images/partners/partner-logo-4.svg` (코드에서 사용 안 함)

---

## 참고 자료

- 현재 PNG 파일 위치: `/public/images/`
- 코드 참조: `components/landing/sections/`
- 디자인 가이드: `IMAGE_SPECS.md`
- 생성 프롬프트: `IMAGE_GENERATION_PROMPTS.md`

---

**마지막 업데이트**: 2024년 (실제 코드 기준)
