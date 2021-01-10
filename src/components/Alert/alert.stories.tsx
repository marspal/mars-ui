import React from 'react';
import Alert from './alert';

export default {
  component: Alert,
  title: 'Alert'
}

export const info = () => <Alert message="this is alert" showClose title="提示标题欧亲"/>
export const success = () => <Alert message="this is alert" type="success"/>
export const danger = () => <Alert message="this is alert" showClose type="danger"/>
export const warning = () => <Alert message="this is alert" showClose title="提示标题欧亲" type="warning"/>