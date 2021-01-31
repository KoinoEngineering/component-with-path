const warn = process.env.NODE_ENV === "development" ? "warn" : "error";

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "react-app",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    "react/prop-types": "off",
    "no-loop-func": "error",
    "no-unused-vars": "off",
    "react/no-danger": "error",
    "no-console": warn,
    "block-spacing": "error",
    "object-curly-spacing": ["error", "always"],
    "@typescript-eslint/no-unused-vars": "error",
    "no-throw-literal": "error",
    "@typescript-eslint/no-explicit-any": warn,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": warn,
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "arrow-body-style": ["error", "always"],
    quotes: ["error", "double"]
  },
};
