# Mini Board - 게시판 관리 시스템

Express + TypeScript + React를 활용한 간단한 게시판 CRUD 학습 예제입니다.

## 기술 스택

### 백엔드
- Express.js (Node.js 프레임워크)
- TypeScript
- In-memory DB (데이터베이스 대신 메모리 사용)

### 프론트엔드
- React 18
- TypeScript
- React Router (라우팅)
- Vite (빌드 도구)

## 주요 기능

- 게시글 목록 조회 (GET /api/posts)
- 게시글 상세 조회 (GET /api/posts/:id)
- 게시글 생성 (POST /api/posts)
- 게시글 수정 (PUT /api/posts/:id)
- 게시글 삭제 (DELETE /api/posts/:id)

## 프로젝트 구조

```
.
├── backend/                 # 백엔드 (Express + TypeScript)
│   ├── src/
│   │   ├── controllers/    # 비즈니스 로직
│   │   ├── models/         # 데이터 모델
│   │   ├── routes/         # API 라우트
│   │   ├── types/          # TypeScript 타입 정의
│   │   └── index.ts        # 서버 진입점
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/               # 프론트엔드 (React + TypeScript)
    ├── src/
    │   ├── components/    # React 컴포넌트
    │   ├── services/      # API 통신
    │   ├── types/         # TypeScript 타입 정의
    │   ├── App.tsx        # 메인 앱 컴포넌트
    │   └── main.tsx       # 진입점
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## 설치 및 실행 방법

### 1. 백엔드 실행

```bash
# backend 폴더로 이동
cd backend

# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5000)
npm run dev
```

### 2. 프론트엔드 실행

새 터미널을 열어서:

```bash
# frontend 폴더로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev
```

### 3. 브라우저에서 확인

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/posts | 게시글 목록 조회 |
| GET | /api/posts/:id | 게시글 상세 조회 |
| POST | /api/posts | 게시글 생성 |
| PUT | /api/posts/:id | 게시글 수정 |
| DELETE | /api/posts/:id | 게시글 삭제 |

## 데이터 모델

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}
```

## 학습 포인트

### 백엔드
- Express.js 기본 구조 (라우터, 컨트롤러, 모델)
- TypeScript를 활용한 타입 안정성
- RESTful API 설계 원칙
- CRUD 로직 구현

### 프론트엔드
- React 컴포넌트 구조
- React Router를 활용한 페이지 라우팅
- useState, useEffect를 활용한 상태 관리
- Fetch API를 활용한 비동기 통신
- TypeScript 타입 안정성

## 주의사항

- 이 프로젝트는 학습용이므로 실제 데이터베이스 대신 메모리를 사용합니다.
- 서버를 재시작하면 모든 데이터가 초기화됩니다.
- 프로덕션 환경에서는 PostgreSQL, MySQL 등의 실제 데이터베이스를 사용해야 합니다.
