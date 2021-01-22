import React from 'react';
import { Story, Meta } from '@storybook/react';
// import { withDesign } from 'storybook-addon-designs'
// 解决样式问题
import {Button, ButtonProps} from './button';

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  btnType: 'primary',
  children: 'button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Button',
  size: 'lg'
};

export const Small = Template.bind({});
Small.args = {
  children: 'Button',
  size: 'sm'
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Button',
  btnType: 'danger'
};