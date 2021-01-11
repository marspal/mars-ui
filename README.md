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

> 方案:
  1. inlineStyle: class性能要比instyle好很多
  2. CSS in JS: 如 style Component; React 中立态度; 不建议使用
  3. Sass/Less: 推荐

> 创建组件库的色彩体系
  1. 系统色板 - 基础色板 + 中性色板 [色板](http://zhongguose.com/)
  
  ```scss
  // 中性色彩; from white to black !default scss提供的, 用户定义后 不在赋值
  $white:    #fff !default;
  $gray-100: #f8f9fa !default;
  $gray-200: #e9ecef !default;
  $gray-300: #dee2e6 !default;
  $gray-400: #ced4da !default;
  $gray-500: #adb5bd !default;
  $gray-600: #6c757d !default;
  $gray-700: #495057 !default;
  $gray-800: #343a40 !default;
  $gray-900: #212529 !default;
  $black:    #000 !default;

  // 基础色板
  $blue:    #0d6efd !default;
  $indigo:  #6610f2 !default;
  $purple:  #6f42c1 !default;
  $pink:    #d63384 !default;
  $red:     #dc3545 !default;
  $orange:  #fd7e14 !default;
  $yellow:  #fadb14 !default;
  $green:   #52c41a !default;
  $teal:    #20c997 !default;
  $cyan:    #17a2b8 !default;

  // 系统色板
  $primary:       $blue !default;
  $secondary:     $gray-600 !default;
  ```


  2. 产品色板 - primary + second


- 组件需求和编码

- 组件测试用例分析和编码

- 代码打包输出和发布

- CI/CD, 文档生成等等