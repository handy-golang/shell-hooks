// https://github.com/AlloyTeam/eslint-config-alloy

module.exports = {
  extends: [
    // ...
    'alloy',
    'alloy/react',
    'alloy/typescript',
  ],
  plugins: [
    // ...
    'react-hooks',
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    window: false,
  },
  rules: {
    // 检查 Hook 的规则
    'react-hooks/rules-of-hooks': 'error',
    // 检查 effect 的依赖
    'react-hooks/exhaustive-deps': 'warn',

    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info', 'group', 'groupCollapsed', 'groupEnd', 'table'],
      },
    ],
    // 禁止使用嵌套的三元表达式
    'no-nested-ternary': 'error',
    // 调用构造函数必须带括号
    'new-parens': 'error',
    // this别名
    'consistent-this': ['error', '_this'],
    // 对象中的属性和方法使用简写
    'object-shorthand': 'error',
    // 不要省括号
    curly: 'error',
    // switch
    'default-case': 'error',
    // const
    'prefer-const': 'error',
    // 模板字符串
    'prefer-template': 'error',
  },
};

// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
