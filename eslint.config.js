import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'

export default defineConfig([
   {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      plugins: { js },

      rules: {
         'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
         'react/jsx-props-no-spreading': 'off',
         'react/react-in-jsx-scope': 'off',
         'import/prefer-default-export': 'off',
         'no-shadow': 'off',
         'react-hooks/exhaustive-deps': 'off',
         'react-hooks/rules-of-hooks': 'error',
         'react/function-component-definition': 'off',
         'max-len': [
            'error',
            {
               code: 100,
               ignoreStrings: true,
               ignoreTemplateLiterals: true,
               ignoreRegExpLiterals: true,
            },
         ],
         'no-console': ['warn', { allow: ['warn', 'error'] }],
         'jsx-a11y/label-has-associated-control': [
            'error',
            {
               required: {
                  some: ['nesting', 'id'],
               },
            },
         ],
      },
      extends: [
         'plugin:react/recommended',
         'airbnb',
         'plugin:prettier/recommended',
      ],
   },
   {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      languageOptions: { globals: globals.browser },
   },
   pluginReact.configs.flat.recommended,
])
