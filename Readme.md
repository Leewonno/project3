
<img width="1920" height="540" alt="novelcut" src="https://github.com/user-attachments/assets/3a5c9ee5-b602-4921-aa16-c82c78d4c64d" />

# NOVELCUT, 웹소설 연재 사이트

**NOVELCUT(노벨컷)** 은 사용자가 직접 웹소설을 작성하고 공유할 수 있는 연재 플랫폼입니다.
네이버웹툰의 컷툰 서비스처럼 컷 형식 보기 방식을 도입했으며,
프론트엔드는 React, 백엔드는 Node.js/Express 기반으로 구축되었습니다.

> 이후 리팩토링을 통해 Node.js의 백엔드 서버를 이용하지 않고, Firebase를 활용한 서버리스 환경으로 전환하였으며, 이를 반영해 서비스가 재배포되었습니다.

<br />

## 📘 목차

- [프로젝트 개요](#-프로젝트-개요)
- [개발 목적](#-개발-목적)
- [주요 기능](#-주요-기능)
- [사용 기술](#-사용-기술)
- [프로젝트 구조](#-프로젝트-구조)
- [설치 및 실행](#-설치-및-실행)

<br />

## 📋 프로젝트 개요

### Frontend
React를 기반으로 구축되었습니다. 아토믹 디자인 패턴(Atomic Design Pattern)을 적용하여 컴포넌트를 재사용 가능한 단위로 구성했습니다. Firebase를 통한 사용자 인증과 DB, Storage를 통해 글 쓰기, 이미지 업로드를 지원하며, React Context API를 통한 전역 상태 관리를 구현했습니다.

**주요 특징:**
- Atomic Design Pattern 적용 (Atom, Molecule, Organism)
- Context API를 통한 전역 상태 관리
- 모듈화된 CSS 스타일링
- 반응형 웹 디자인

### Backend
Node.js와 Express 프레임워크를 사용하여 구축되었습니다. MySQL과 Sequelize ORM을 통해 데이터를 관리하며, JWT(JSON Web Token)를 사용한 사용자 인증과 bcrypt를 통한 비밀번호 암호화를 구현했습니다. AWS S3를 통한 파일 업로드 기능을 제공합니다.

**주요 특징:**
- RESTful API 설계
- JWT 기반 인증
- Sequelize ORM을 통한 데이터베이스 관리
- AWS S3를 통한 이미지 저장

<br />

## 💡 개발 목적
위아래로 스크롤하는 소설은 이제 그만!<br />
조금 더 색다르고 새로운 방식으로 소설을 읽을 수는 없을까?<br />

NOVELCUT은 소설 읽기에 새로운 재미와 경험을 더하기 위해 개발되었습니다.

<br />

## ⚡️ 주요 기능

- 소설 읽기/생성/수정/삭제 : Firebase Firestore를 통한 데이터 관리
- 사용자 인증 : Firebase Authentication 을 통한 사용자 인증
- 전역 상태 관리 : Context API를 통한 전역 상태 관리
- 검색 및 정렬 : 제목, 작가명 검색, 최신순, 인기순(조회수) 정렬
- 이미지 업로드 : AWS S3 또는 Firebase Storage를 통한 이미지 업로드

<br />

## ⚙️ 사용 기술

### Frontend

| 기술 | 버전 | 용도 |
|------|------|------|
| **React** | 18.2.0 | JavaScript 라이브러리(SPA를 통한 부드러운 전환) |
| **Axios** | 1.5.1 | HTTP 비동기 통신 라이브러리 |
| **Firebase** | 11.5.0 | Firestore, Authentication, Hosting, Storage |
| **AWS SDK** | 2.1473.0 | AWS S3 연동 |

### Backend

| 기술 | 버전 | 용도 |
|------|------|------|
| **Node.js** | - | 런타임 환경 |
| **Express** | 4.18.2 | 웹 프레임워크 |
| **bcrypt** | 5.1.1 | 비밀번호 해싱 |
| **jsonwebtoken** | 9.0.2 | JWT 토큰 생성 및 검증 |
| **multer-s3** | 2.10.0 | AWS S3 파일 업로드 |

### 인프라 및 서비스

- **AWS EC2** : 백엔드 서버(Node.js) 호스팅
- **AWS RDS** : 데이터베이스를 운영
- **AWS S3**: 파일 저장소 (이미지 파일 업로드)
- **MySQL**: 관계형 데이터베이스
- **Firebase**: Firestore, Authentication, Hosting, Storage

<br />

## 🗂️ 프로젝트 구조

### Frontend 구조

```
client/
├── public/ # 정적 파일
├── src/
│   ├── atom/
│   ├── molecule/
│   ├── organism/
│   ├── newRouter/ # 리팩토링된 라우터 컴포넌트
│   ├── router/ # 기존 라우터 컴포넌트
│   ├── store/ # 전역 상태 관리
│   ├── login/ # 로그인 관련 로직
│   ├── css/ # 모듈화된 CSS 파일
└── └── image/ # 이미지 리소스
```

### Backend 구조

```
server/
├── config/ # 설정 파일
├── controller/ # 컨트롤러 (비즈니스 로직)
├── models/ # Sequelize 모델 정의
├── router/ # 라우터 정의
└── upload/ # 파일 업로드 관련
```

<br />


## 🏃 설치 및 실행

### 사전 요구사항
- Node.js
- npm 또는 yarn
- MySQL
- AWS 계정
- Firebase 계정

### Frontend 설치 및 실행

```bash
# 프로젝트 루트 디렉토리로 이동
cd client

# 의존성 설치
npm install

# 환경 변수 설정 (client 폴더에 .env 파일 생성)
# REACT_APP_API_KEY=your_firebase_api_key
# REACT_APP_AUTH_DOMAIN=your_firebase_auth_domatin
# REACT_APP_PROJECT_ID=your_firebase_project_id
# REACT_APP_STORAGE_BUCKET=your_firebase_storage_bucket
# REACT_APP_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
# REACT_APP_APP_ID=your_firebase_app_id

# 개발 서버 실행
npm start
```

### Backend 설치 및 실행

```bash
# 서버 디렉토리로 이동
cd server

# 의존성 설치
npm install

# 환경 변수 설정 (server 폴더에 .env 파일 생성)
# .env 파일에 다음 내용 추가:
# DB_USER=your_db_user
# DB_PW=your_db_password
# DB_DATABASE=your_database_name
# DB_HOST=your_db_host
# AWS_ACCESSKEY=your_aws_access_key
# SECRET_ACCESSKEY=your_aws_secret_key
# AWS_BUCKET=your_s3_bucket_name
# REGION=your_aws_region

# 데이터베이스 마이그레이션 (Sequelize)
npx sequelize-cli db:migrate

# 서버 실행
node server.js
```

