// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,cjs,mjs,ts,cts,mts}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      // se quiser usar regras específicas no futuro
    },
    rules: {
      // Regras personalizadas aqui
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      ...prettier.rules, // Desativa regras conflitantes com Prettier
    },
  },
]);
