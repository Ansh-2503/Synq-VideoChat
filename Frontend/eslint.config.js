import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      prettier,
    },

    rules: {
      /* =====================
         REAL ERRORS (RED)
      ====================== */

      "react-hooks/rules-of-hooks": "error",
      "prettier/prettier": "error",

      /* =====================
         REAL WARNINGS (YELLOW)
      ====================== */

      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "warn",

      /* =====================
         DISABLED NOISE
      ====================== */

      "no-console": "off", // no yellow unless YOU want it
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
