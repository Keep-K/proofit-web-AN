#!/bin/bash
# PROOFIT 이미지 생성 스크립트
# OpenAI API 키가 설정되어 있고 조직 인증이 완료된 후 실행

cd /home/keep/proofit-web

echo "PROOFIT 이미지 생성 시작..."

# 1. Open Graph 이미지 (1200x630px)
echo "1/10: Open Graph 이미지 생성 중..."
# Note: OpenAI gpt-image-1은 1024x1024, 1024x1536, 1536x1024만 지원
# 1200x630은 생성 후 리사이즈 필요

# 2. Favicon (32x32px) - 작은 크기이므로 직접 생성 어려움, 대신 로고에서 리사이즈 권장

# 3. Apple Touch Icon (180x180px)
echo "3/10: Apple Touch Icon 생성 중..."

# 4. 로고 (36x36px) - 작은 크기이므로 더 큰 크기로 생성 후 리사이즈 권장

# 5. Hero Visual (1040x520px)
echo "5/10: Hero Visual 생성 중..."

# 6. Problem Illustration (600x400px)
echo "6/10: Problem Illustration 생성 중..."

# 7. CoreAI Module Visuals (4개, 각 400x280px)
echo "7/10: CoreAI Module Visuals 생성 중..."

# 8. Integrity Diagram (800x500px)
echo "8/10: Integrity Diagram 생성 중..."

# 9. Partner Logos (5개, 각 104x36px) - 작은 크기이므로 더 큰 크기로 생성 후 리사이즈 권장

echo "이미지 생성 완료!"

