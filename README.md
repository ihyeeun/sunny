<div align="center">

## SUNNY

SUNNY는 Supabase를 기반으로 구현한 SNS 플랫폼으로, <br/>
**피드 작성, 중첩 댓글, 좋아요, 프로필 관리, 무한 스크롤** 등 핵심 소셜 기능을 설계하고 개발한 프로젝트입니다. <br/>
**인증, 이미지 업로드, 캐싱 최적화** 등 실무 수준의 구조를 경험하기 위해 제작했습니다.

<a href="https://sunny-sns.vercel.app">sunny-sns.vercel.app</a>

## 기술스택

### Frontend

| 기술                                                                                                                                                                             | 선정이유                                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white" /> <img src="https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white" /> | 빠른 개발 환경 구축을 위해 Vite 기반으로 선택                                  |
| <img src="https://img.shields.io/badge/TypeScript-5.8.x-3178C6?logo=typescript&logoColor=white" />                                                                               |                                                                                |
| <img src="https://img.shields.io/badge/TailwindCSS-4.1.16-06B6D4?logo=tailwindcss&logoColor=white" />                                                                            |                                                                                |
| <img src="https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white" />                                                                                        |                                                                                |
| <img src="https://img.shields.io/badge/Zustand-5.0.8-000000" />                                                                                                                  | **전역상태 관리** Redux보다 사용법이 간단하고, 용량이 가벼워 사용              |
| <img src="https://img.shields.io/badge/TanStack_Query-5.90.5-FF4154" />                                                                                                          | **서버상태 관리 캐싱** 리패칭, 비동기 상태 관리, 에러 처리까지 자동화          |
| <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white" />                                                                                             | 무료플랜으로 배포                                                              |
| <img src="https://img.shields.io/badge/react--intersection--observer-10.0.0-61DAFB" />                                                                                           | Intersection Observer 기반으로 **무한 스크롤**을 안정적으로 구현하기 위해 사용 |

### Backend

| 기술                                                                                            | 선정이유                                                                  |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| <img src="https://img.shields.io/badge/Supabase-2.77.0-3ECF8E?logo=supabase&logoColor=white" /> | Auth, Database(PostgreSQL), Storage · RLS 보안까지 제공하는 올인원 백엔드 |

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

## 주의사항

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

<div align="center">

## 기능별 구현 방식

| 기능               | 설명                                                                                                                                                                                                                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **인증 & 인가**    | Supabase Auth 기반의 이메일 로그인/회원가입, 비밀번호 재설정, GitHub 소셜 로그인을 구현. 인증 방식은 세션/토큰 중 **토큰 기반 인증**을 채택. <br/>`onAuthStateChange`로 로그인·로그아웃·토큰 갱신 등의 이벤트를 **실시간으로 구독**하고, 변화가 발생할 때마다 Zustand 전역 상태에 반영하여 **앱 전역의 일관된 인증 상태**를 유지. |
| **이미지 업로드**  | 이미지 파일은 Supabase Storage에 저장. <br/>이미지 없는 상태로 먼저 피드를 생성하여 feed_id를 받고, <br/>이후 Storage에 이미지를 업로드한 뒤 해당 이미지 URL을 피드 데이터에 업데이트하는 방식으로 구현.                                                                                                                          |
| **피드 캐싱 구조** | 피드를 `FeedList`와 `FeedItem`으로 분리하여 캐싱. <br/>- List에는 **FeedID만 저장** → 리스트 중복 최소화<br/>- Item에는 **실제 Feed 데이터 저장** → 개별 조회 및 상태 업데이트에 최적화                                                                                                                                           |
| **무한 스크롤**    | `useInfiniteQuery`를 활용해 페이징 기반 무한 스크롤 구현. <br/>화면 하단에 배치한 sentinel(`div`)이 뷰포트에 들어오면 자동으로 다음 페이지 데이터를 요청하는 방식.                                                                                                                                                                |
| **게시물 좋아요**  | 좋아요 정보는 별도 Like 테이블에서 관리하고 Feed 테이블과 JOIN하여 조회. <br/>UI는 **낙관적 업데이트**로 즉시 반영하고,<br/>서버는 트랜잭션 + **행 잠금(FOR UPDATE)** 기반으로 동시성 문제를 제어해 like_count 일관성을 유지.                                                                                                     |
| **무한 중첩 댓글** | Comments 테이블에서 댓글 구조를 관리. <br/>- 일반 댓글: `parent_id = null`<br/>- 1단계 답글: `parent_id`로 상위 댓글 참조<br/>- 2단계 이상 답글: `root_id`로 최상위 댓글을 추적하고 `parent_id`로 계층 관계 유지 → **트리 구조 형태로 무한 중첩 가능**                                                                            |
| **다크 모드**      | 라이트/다크 모드 외에 **OS 시스템 테마를 자동으로 감지**해 UI에 반영하도록 구현.                                                                                                                                                                                                                                                  |

## 기능 이미지

Auth

|로그인|회원가입|비밀번호 찾기|비밀번호 재설정|

Feed

|홈(피드 리스트)|피드 아이템|댓글|무한 스크롤|좋아요|피드 수정|피드 삭제|

Profile

|내 프로필|다른 유저 프로필|프로필 수정|

## 페이지 구조도

## 문제해결 및 해결방안

</div>
