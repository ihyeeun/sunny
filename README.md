<details>
  <summary>Frontend Folder Structure <Code> Click me 🙌 </Code> </summary>

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
+ `shared/`에서 `features/` import 금지<br/>
+ `shared/utils`에서는 `shared/lib` import 금지 (순수성 보장)<br/>
+ `features/*/utils`는 같은 feature 내부 또는 shared만 import<br/>

> features/feature/**index.ts**<br/>
> Barrel 최소화 및 외부에 노출할 최소 API만 re-export<br/>
> Page + 필요한 최소 컴포넌트 + type-only만 내보내고, API/hooks/도메인 유틸은 절대 외부에 노출하지 마세요.<br/>
> 다른 feature에 의존하지 않도록 결합도를 낮추기 위해서임.<br/>

```ts
// 타입은 type-only export 권장
export type { Todo, TodoId } from './types/todo';

// 외부에서 재사용해도 되는 컴포넌트만 공개
export { TodoCard } from './components/TodoCard';

// Page 진입점만 공개 (라우트에서 사용)
export { default as TodoListPage } from './pages/TodoListPage';
export { default as TodoDetailPage } from './pages/TodoDetailPage';
```

<hr/>

</details>
