import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
   { 
      files: ["**/*.{js,mjs,cjs}"], 
      plugins: { js }, extends: ["js/recommended"], 
      languageOptions: { globals: globals.node },
      rules: {
         semi: ["error", "always"],
         indent:["error", 3],
         "no-unused-vars": "warn",
         "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      },
   },
]);
