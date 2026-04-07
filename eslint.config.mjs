import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'eslint.config.mjs'],
    },
    ...compat.config({
        extends: [
            'eslint:recommended',
            'plugin:import/recommended',
            'plugin:import/typescript',
            'plugin:jest/recommended',
            'plugin:sonarjs/recommended-legacy',
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-type-checked',
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: 'tsconfig.json',
            tsconfigRootDir: __dirname,
            sourceType: 'module',
        },
        plugins: ['@typescript-eslint', 'sonarjs', 'jest', 'import'],
        env: {
            node: true,
            jest: true,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            indent: ['error', 4, {
                MemberExpression: 1,
                ignoredNodes: [
                    'FunctionExpression > .params[decorators.length > 0]',
                    'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                    'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
                ],
            }],
            '@typescript-eslint/no-explicit-any': 'off',
            'linebreak-style': 'off',
            'no-console': 'off',
            'import/prefer-default-export': 'off',
            'class-methods-use-this': 'off',
            '@typescript-eslint/lines-between-class-members': 'off',
            'max-len': ['warn', { code: 160 }],
            'object-curly-newline': [
                'error',
                {
                    ImportDeclaration: 'never',
                    ExportDeclaration: 'never',
                },
            ],
            'import/extensions': 'off',
        },
    }),
    {
        files: ['**/*.spec.ts', 'test/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unsafe-argument': 'off',
        },
    },
];
