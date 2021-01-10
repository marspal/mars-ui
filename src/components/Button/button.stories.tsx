import React from 'react';
import { action } from '@storybook/addon-actions';

// 解决样式问题
import Button from './button';

export default {
  component: Button,
  title: "Button 组件"
}
// CSF 模式下不能使用中文名
export const basic = () => <Button onClick={action("clicked")}>basic</Button>
export const size  = () => (
  <>
    <Button size="lg">large Button</Button>&nbsp;&nbsp;
    <Button size="sm">small Button</Button>
  </>
);

export const type = () => (
  <>
    <Button btnType="primary">primary</Button>&nbsp;&nbsp;
    <Button btnType="danger">danger</Button>&nbsp;&nbsp;
    <Button btnType="default">default</Button>&nbsp;&nbsp;
    <Button btnType="link" href="https://www.baidu.com" target="_blank">link</Button>
  </>
);
