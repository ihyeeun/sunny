import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. react 및 외부 패키지
            ["^react$", "^react-dom$", "^@?\\w"],
            // 2. alias import
            ["^@shared", "^@commons", "^@features", "^@/"],
            // 3. 상대경로
            ["^\\./", "^\\.\\./"],
            // 4. 스타일/에셋
            ["\\.css$", "\\.(scss|sass)$", "\\.(png|svg|jpe?g|gif|webp)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "@typescript-eslint/naming-convention": [
        "error",

        // 1) 기본: 변수/함수/파라미터/메서드 = camelCase
        {
          selector: ["parameter", "classMethod", "typeMethod"],
          format: ["camelCase"],
          leadingUnderscore: "allow", // _id, _unused 허용
        },

        {
          selector: ["function"],
          format: ["camelCase", "PascalCase"], // ← 컴포넌트 함수 허용
        },

        // 2) 타입 관련(Interface/Type/Alias/Class/Enum) = PascalCase
        { selector: "typeLike", format: ["PascalCase"] },

        // 3) enum 멤버 = PascalCase (원하면 UPPER_CASE로 바꿔도 됨)
        { selector: "enumMember", format: ["PascalCase"] },

        // 4) const 원시값(환경변수/상수 등) = UPPER_CASE도 허용
        {
          selector: "variable",
          modifiers: ["const"],
          types: ["string", "number", "boolean"],
          format: ["camelCase", "UPPER_CASE"],
        },

        // 5) boolean 변수 접두사 권장: is/has/can/should
        {
          selector: "variable",
          types: ["boolean"],
          format: ["camelCase"],
          prefix: ["is", "has", "can", "should"],
        },

        // 6) 클래스/인터페이스의 public/protected 멤버 = camelCase
        {
          selector: "classProperty",
          modifiers: ["public", "protected"],
          format: ["camelCase"],
        },

        // 10) import 된 식별자는 변경 불가하니 검사 제외(라이브러리 이름 그대로)
        {
          selector: "import",
          format: null,
        },
      ],
    },
  },
);
