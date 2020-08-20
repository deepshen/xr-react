module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // 用来处理webpack中指定别名但eslint未能识别报的错
  settings: {
    "import/resolver": {
      webpack: {
        config: './webpack.config.js'  // 指定webpack配置文件路径
      }
    }
  },
  rules: {
    "react/jsx-props-no-spreading": 0,
    "import/no-extraneous-dependencies":0,
    "@typescript-eslint/no-var-requires":0,
    "react/prop-types":0,
    "no-loop-func":0,
    "react/require-default-props":0,
    "react/state-in-constructor": 0,
    "react/destructuring-assignment":0,
    "comma-dangle": [2, 'always-multiline'],
    "no-console": 2,
    "no-irregular-whitespace": 0, //不规则的空白不允许
    "no-underscore-dangle": 0,
    "array-bracket-spacing": [2, 'never'] // 指定数组的元素之间要以空格隔开(,后面)
  },
  globals: {
    fetch: true
  },
}
