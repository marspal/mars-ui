import { configure, addDecorator, addParameters } from '@storybook/react';
const { withInfo } = require('@storybook/addon-info');

import React from "react"
// 加入样式文件
import "../src/styles/index.scss";

// 样式调整
const styles: React.CSSProperties = {
  padding: '20px 40px',
};
const Center = (storyFn: any) => <div style={styles}>
  <h3>组件演示</h3>
  {storyFn()}
</div>;

// 添加进addon
addDecorator(Center);
addDecorator(withInfo);
// ({
//   text: `
//     very nice 
//     ## this.is a header
//     ~~~js
//     <Button>Click Here</Button>
//     ~~~
//   `,
//   header: false,
//   inline: true
// })
addParameters({info: {inline: true, header: false}});
// addDecorator(withInfo({
//   inline: true,
//   header: true,
//   source: false,
// }))
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};
configure(loaderFn, module);