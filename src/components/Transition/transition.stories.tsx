import React, { useState } from 'react';
import {Story, Meta} from '@storybook/react';
import Transition, {TransitionProps} from './transition';
import Button from '../Button';

export default {
  title: "Transition",
  component: Transition
} as Meta;

const dropDownStyle = {
  height: '300px',
  width: '300px',
  background: '#eee',
  border: '1px solid #aaa'
}
const Template: Story<TransitionProps> = (args) => {
  let [show, setShow] = useState<boolean>(false);
  return <div>
    <Button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</Button>
    <Transition {...args} in={show} style={dropDownStyle}>
      <div>asd</div>
    </Transition>
  </div>
}

export const ZoomInTop = Template.bind({});
ZoomInTop.args = {
  animation: 'zoom-in-top',
  timeout: 300,
}