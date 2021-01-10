## React UI Component

### 基础知识

- 状态提升 or 单项数据流

  通常可变的数据都有一个单一的数据流

- 配置React开发环境
  create-react-app 安装: npx create-react-app my-app
  npx 作用: 会将node_modules/bin加入path变量; 结束后删除
  1. 避免安装全局模块
  2. 调用内部安装模块 如: npx mocha --version

- Hook规则
  1. 只在最顶层使用Hook
  2. 只在函数中调用Hook

### 组件架构

- 目录结构和代码规范
  1. 目录结构
```
  |--node_modules
  |--public
  |--src
     |-- components
         |--Button
            |--button.tsx
            |--button.test.tsx
            |--style.scss 组件单独样式
     |-- styles 全局样式文件
        _variables.scss (各种变量以及可配置设置)
        _minxins.scss (全局mixins)
        _functions.scss (全局functions) 
```       

  2. 代码规范
    create-react-app天生自带项目规范; .eslintrc中配置相关规则; 注意: 开启vscode编辑器 ESLint按钮

- [样式解决方案](https://reactjs.org/docs/faq-styling.html)
  1. inlineStyle: class性能要比instyle好很多
  2. CSS in JS: style Component, React 中立态度; 不建议使用
  3. Sass/Less: 推荐

- 组件需求和编码

- 组件测试用例分析和编码

- 代码打包输出和发布

- CI/CD, 文档生成等等