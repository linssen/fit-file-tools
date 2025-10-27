import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
    js.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                console: "readonly",
                document: "readonly",
                window: "readonly",
                HTMLInputElement: "readonly",
                File: "readonly",
                FileReader: "readonly",
                ArrayBuffer: "readonly",
                Buffer: "readonly",
                setTimeout: "readonly",
                global: "readonly",
                require: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            prettier: prettier,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...prettierConfig.rules,
            "prettier/prettier": "error",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/no-require-imports": "off",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-undef": "off", // TypeScript handles this
        },
    },
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                module: "readonly",
                require: "readonly",
                __dirname: "readonly",
                process: "readonly",
            },
        },
    },
    {
        ignores: [
            "dist/**",
            "node_modules/**",
            "coverage/**",
            "*.config.js",
            ".eslintrc.*",
        ],
    },
];
