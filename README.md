🏠 Roomy (루미) - 프론트엔드
AI 기반 룸메이트 매칭 및 낙후 시설물 관리 솔루션

**루미(Roomy)**는 사용자의 생활 패턴을 분석해 최적의 룸메이트를 추천하고, 주거 공간의 파손이나 낙후된 시설을 AI로 판독하여 자동으로 신고서를 작성해 주는 스마트 주거 관리 앱입니다.

📋 목차 (Table of Contents)
프로젝트 목표 (Project Goal)

주요 기능 (Key Features)

기술 스택 (Tech Stack)

시작하기 (Getting Started)

폴더 구조 (Folder Structure)

🎯 프로젝트 목표 (Project Goal)
이 프로젝트는 주거 생활에서 겪는 두 가지 큰 불편함을 해결하고자 합니다.

성향 차이로 인한 갈등 해결: AI가 생활 습관을 분석하여 가장 잘 맞는 룸메이트를 매칭해 줍니다.

시설 관리의 번거로움 해소: 고장 난 시설물을 사진만 찍으면 AI가 심각도를 판단하고, 건물주나 관리인에게 보낼 신고서 초안을 대신 작성해 줍니다.

✨ 주요 기능 (Key Features)
1. AI 룸메이트 매칭 (AI Roommate Matching)
생활 패턴 분석: 기상 시간, 소음 민감도, 청소 주기 등 사용자 습관 분석.

매칭 알고리즘: 데이터 기반의 적합도 점수 산출 및 사용자 추천.

2. AI 시설물 판독 및 신고 (AI Facility Inspection)
AI 판독: 낙후되거나 파손된 부위의 사진을 찍으면 AI가 즉시 상태 파악.

중요도 안내: 수리가 얼마나 급한 상황인지 심각도 단계 제공.

신고서 자동 생성: 판독 결과를 바탕으로 바로 제출 가능한 신고서 양식 작성.

🛠 기술 스택 (Tech Stack)
프레임워크(Framework): Expo / React Native (크로스 플랫폼 앱 개발)

상태 관리(State Management): Zustand (가볍고 직관적인 상태 관리)

데이터 통신(Networking): Axios (HTTP 클라이언트 라이브러리)

⚙️ 시작하기 (Getting Started)
사전 준비 (Prerequisites)
Node.js 설치 (18버전 이상 권장)

모바일 기기에 Expo Go 앱 설치

설치 방법 (Installation)
Bash

# 1. 저장소 복제 (Clone the repository)
git clone https://github.com/lastro1206/Roomy-frontend.git

# 2. 디렉토리 이동 (Move to the directory)
cd Roomy-frontend

# 3. 의존성 설치 (Install dependencies)
npm install
실행 방법 (Usage)
Bash

# Expo 개발 서버 실행 (Start the development server)
npx expo start
📂 폴더 구조 (Folder Structure)
Plaintext

src/
 ├── apis/        # Axios 설정 및 API 통신 관련 (API setup)
 ├── components/  # 재사용 가능한 UI 컴포넌트 (UI components)
 ├── screens/     # 각 화면 구성 (App screens)
 ├── store/       # Zustand 상태 정의 (State management)
 ├── hooks/       # 커스텀 리액트 훅 (Custom hooks)
 └── utils/       # 공통 도움 함수 (Helper functions)
