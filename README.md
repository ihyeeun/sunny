<div align="center">

# SUNNY

SUNNY는 Supabase를 기반으로 구현한 SNS 플랫폼으로, <br/>
**피드 작성, 중첩 댓글, 좋아요, 프로필 관리, 무한 스크롤** 등 핵심 소셜 기능을 설계하고 개발한 개인 프로젝트입니다. <br/>
**인증, 이미지 업로드, 캐싱 최적화** 등 기술의 경험치를 쌓기 위해 진행했습니다.

<a href="https://sunny-sns.vercel.app">sunny-sns.vercel.app</a>

<br/>

## 기술스택

### Frontend

| 기술 | 선정이유 |
| :-- | :-- |
| <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white" /> <img src="https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white" /> | 구조 설계의 유연성 + 빌드 파이프라인 효율화로 Vite 사용. |
| <img src="https://img.shields.io/badge/TypeScript-5.8.x-3178C6?logo=typescript&logoColor=white" /> |런타임 오류를 근본적으로 줄여 개발 속도 향상.|
| <img src="https://img.shields.io/badge/TailwindCSS-4.1.16-06B6D4?logo=tailwindcss&logoColor=white" /> |디자인 토큰 기반 유틸리티 CSS 사용하여 개발 속도 향상.|
| <img src="https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white" />|웹 접근성 표준을 충족하는 컴포넌트 제공으로 빠른 UI 구현 용이.|
| <img src="https://img.shields.io/badge/Zustand-5.0.8-000000" />| **전역상태 관리** 인증/모달/전역 플래그 등 관리. Redux보다 용량이 가볍고, 직관적인 사용법으로 사용.|
| <img src="https://img.shields.io/badge/TanStack_Query-5.90.5-FF4154" /> | **서버상태 관리 캐싱** 리패칭, 비동기 상태 관리, 에러 처리까지 관리하기 위함.|
| <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white" />| 프론트 중심 프로젝트에서 가장 빠르고 간단하게 CI/CD 가능.|
| <img src="https://img.shields.io/badge/react--intersection--observer-10.0.0-61DAFB" />| Intersection Observer 기반으로 **무한 스크롤**을 안정적으로 구현하기 위해 사용 |

### Backend

| 기술 | 선정이유 |
| :-- | :-- |
| <img src="https://img.shields.io/badge/Supabase-2.77.0-3ECF8E?logo=supabase&logoColor=white" /> | Auth, Database(PostgreSQL), Storage, RLS 보안까지 제공하는 올인원 백엔드 |

</div>

<details>
  <summary align="center">Frontend Folder Structure <Code> Click me 🙌 </Code> </summary>

  <br/>
  
```bash
src/
├── features/                     # 도메인(기능)별 핵심 비즈니스 로직
│   └── feature(domain)/
│       ├── types/
│       ├── constants/
│       │   ├── endpoint.ts       # 서버 API 경로 로컬 관리
│       │   └── query-key.ts      # 서버 상태 관리 캐싱 값
│       ├── utils/                # 비즈니스에 종속된 규칙, 형식화(이 로직은 다른 도메인에서 재사용 X)
│       ├── api/
│       ├── hooks/
│       │   ├── queries/          # rule : useXxxQuery.ts
│       │   └── mutations/        # rule : useXxxMutation.ts
│       ├── contexts/             # feature(domain) 내부의 지역 상태 관리
│       ├── components/
│       ├── pages/
│       └── index.ts              # Page, Component, Type만 import하도록 표면을 최소화
│
├── shared/                       # 프로젝트 전역 공유 리소스
│   ├── ui/
│   │   ├── shadcn                # 프레임 워크 UI 컴포넌트
│   │   └── commons               # 프로젝트 공통 컴포넌트
│   ├── constants/
│   │   └─ path.ts                # 프론트 URL(라우트) 전역 관리
│   ├── utils/                    # 도메인 불문 순수 함수
│   ├── lib/                      # 외부 라이브러리를 import하고, 프로젝트 코드가 일관된 방식으로 사용할 수 있는 인터페이스를 제공하도록 한다. 라이브러리의 설정/초기화/공통 처리 등등
│   │   └── api/
│   ├── hooks/                    # 서버 상태를 쉽게 다루게 해주는 공통 훅/래퍼
│   └── store/                    # 전역 상태 관리
│
├── App.tsx                       # Route
└── main.tsx                      # 진입점
```

### 주의사항

- `shared/`에서 `features/` import 금지<br/>
- `shared/utils`에서는 `shared/lib` import 금지 (순수성 보장)<br/>
- `features/*/utils`는 같은 feature 내부 또는 shared만 import<br/>

> features/feature/**index.ts**<br/>
> Barrel 최소화 및 외부에 노출할 최소 API만 re-export<br/>
> Page + 필요한 최소 컴포넌트 + type-only만 내보내고, API/hooks/도메인 유틸은 절대 외부에 노출하지 마세요.<br/>
> 다른 feature에 의존하지 않도록 결합도를 낮추기 위해서임.<br/>

```ts
// 타입은 type-only export 권장
export type { Todo, TodoId } from "./types/todo";

// 외부에서 재사용해도 되는 컴포넌트만 공개
export { TodoCard } from "./components/TodoCard";

// Page 진입점만 공개 (라우트에서 사용)
export { default as TodoListPage } from "./pages/TodoListPage";
export { default as TodoDetailPage } from "./pages/TodoDetailPage";
```

<hr/>

</details>

<br/>

<div align="center">

## 기능별 구현 방식

| 기능 | 설명 |
| --- | -- |
| **인증 & 인가** | Supabase Auth 기반의 이메일 로그인/회원가입, 비밀번호 재설정, GitHub 소셜 로그인을 구현.<br/> 인증 방식은 세션/토큰 중 **토큰 기반 인증**을 채택. <br/> `onAuthStateChange`로 로그인·로그아웃·토큰 갱신 등의 이벤트를 실시간으로 구독하고,<br/> 변화가 발생할 때마다 Zustand 전역 상태에 반영하여 앱 전역의 일관된 인증 상태를 유지. |
| **이미지 업로드** | 이미지 파일은 Supabase Storage에 저장. <br/>이미지 없는 상태로 먼저 피드를 생성하여 feed_id를 받고, <br/>이후 Storage에 이미지를 업로드한 뒤 해당 이미지 URL을 피드 데이터에 업데이트하는 방식으로 구현.|
| **피드 캐싱 구조** | 피드를 `FeedList`와 `FeedItem`으로 분리하여 캐싱. <br/>- List에는 FeedID만 저장 → 리스트 중복 최소화<br/>- Item에는 실제 Feed 데이터 저장 → **개별 조회 및 상태 업데이트에 최적화**|
| **무한 스크롤** | `useInfiniteQuery`를 활용해 페이징 기반 무한 스크롤 구현. <br/>화면 하단에 배치한 sentinel(`div`)이 뷰포트에 들어오면 자동으로 다음 페이지 데이터를 요청하는 방식.|
| **게시물 좋아요**  | 좋아요 정보는 별도 Like 테이블에서 관리하고 Feed 테이블과 JOIN하여 조회. <br/>UI는 **낙관적 업데이트**로 즉시 반영하고,<br/>서버는 트랜잭션 + 행 잠금(FOR UPDATE) 기반으로 동시성 문제를 제어해 like_count 일관성을 유지.|
| **무한 중첩 댓글** | Comments 테이블에서 댓글 구조를 관리. <br/>- 일반 댓글: `parent_id = null`<br/>- 1단계 답글: `parent_id`로 상위 댓글 참조<br/>- 2단계 이상 답글: `root_id`로 최상위 댓글을 추적하고 `parent_id`로 계층 관계 유지 → 트리 구조 형태로 무한 중첩 가능|
| **다크 모드** | 라이트/다크 모드 외에 **OS 시스템 테마를 자동으로 감지**해 UI에 반영하도록 구현.|

<br/>

## 기능 이미지

### Auth

|로그인|회원가입|비밀번호 찾기|비밀번호 재설정|
|-|-|-|-|
|<img width="309" height="623" alt="image" src="https://github.com/user-attachments/assets/3f86af84-b2c9-4f81-b0a7-21389456c2de" />|<img width="309" height="623" alt="image" src="https://github.com/user-attachments/assets/2d8e0c4b-e7fd-4d2d-a483-8f5f65b1114d" />|<img width="309" height="623" alt="image" src="https://github.com/user-attachments/assets/964e2dec-4882-4462-834c-00b6bcbda11a" />|<img width="309" height="623" alt="image" src="https://github.com/user-attachments/assets/fdd05124-0555-4a39-bef6-f966ef539e77" />|





### Feed

|홈(피드-무한 스크롤)|피드 작성|피드 수정|피드 삭제|
|-|-|-|-|
|![무한스크롤](https://github.com/user-attachments/assets/7d7673c8-874b-46ba-9b71-1e862f31d594)|![피드작성](https://github.com/user-attachments/assets/9010b736-0cc1-41a8-bb45-657daa3f66a3)|![수정](https://github.com/user-attachments/assets/25e7953d-2a0d-4985-8362-ba04d534501e)|![삭제](https://github.com/user-attachments/assets/906d019c-871a-400b-9a61-379f5e53d152)|

|좋아요|피드 아이템|중첩 댓글|다크모드|
|-|-|-|-|
|![좋아요](https://github.com/user-attachments/assets/ff0779d3-aa3a-41f0-a737-3511aa540d69)|<img width="309" height="623" alt="image" src="https://github.com/user-attachments/assets/2e812876-41e8-48fc-818e-fa29f492096e" />|![댓글](https://github.com/user-attachments/assets/cf9dc176-30ab-4ebe-aa82-f997a4095992)|![다크모드](https://github.com/user-attachments/assets/1b7ddbac-6aed-41b0-9966-e7ea7cdfefe9)|

### Profile

|내 프로필|로그아웃|다른 유저 프로필|프로필 수정|
|-|-|-|-|
|![프로필](https://github.com/user-attachments/assets/2f9950c9-bf6b-4304-8bcb-d22f72f9a238)| ![로그아웃](https://github.com/user-attachments/assets/bef11c25-fa29-47da-ae35-bd6530a17f85) |![제목 없는 디자인](https://github.com/user-attachments/assets/650fa57c-8b7f-4324-ab55-ad2465a5596c)|![프로필 수정](https://github.com/user-attachments/assets/532b3412-2316-4083-a1d1-dc0adab3eae1)|

<br/>

## 페이지 흐름 및 데이터 구조

|페이지 구조도|DB 테이블|
|--|--|
|<img width="1024" alt="페이지 구조도" src="https://github.com/user-attachments/assets/dc28133b-3313-42d6-bee3-2bf8124dfc26" />|<img width="1024" height="1412" alt="sunny-db" src="https://github.com/user-attachments/assets/8f993432-ca86-43e5-bcca-4a87088407dd" />|

<br/>

## 프로젝트 진행하면서 공부한 내용

|인증/인가|서버상태 관리(Tanstack Query)|Zustand|이미지 업로드|댓글구현|
|--|--|--|--|--|

</div>

> [!NOTE]
> 추후 블로그 글 작성하면서 링크 연동하겠습니다.
