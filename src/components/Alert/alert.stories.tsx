import React from 'react';
import {Story, Meta} from '@storybook/react';
import Alert, {IAlertProps} from './alert';

export default {
  component: Alert,
  title: 'Alert'
} as Meta;

const Template: Story<IAlertProps> = args => <Alert {...args}/>

export const Info = Template.bind({});
Info.args = {
  message: 'info context',
  showClose: true,
  title: 'infoTitle'
};

export const Success = Template.bind({});
Success.args = {
  message: 'success context',
  type: 'success'
};

export const Danger = Template.bind({});
Danger.args = {
  message: 'Danger context',
  type: 'danger',
  showClose: true
};

export const Warning = Template.bind({});
Warning.args = {
  message: 'Warning context',
  type: 'warning',
  showClose: true,
  title: 'warning'
};
