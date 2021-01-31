import React from 'react';
import { Story, Meta } from '@storybook/react';
import Progress, {IProgressProps} from './progress';

export default {
  title: "Progress",
  component: Progress
} as Meta;

const Template: Story<IProgressProps> = (args) => <Progress {...args}/>

export const Primary = Template.bind({});
Primary.args = {
  percent: 30
}

export const Secondary = Template.bind({});
Secondary.args = {
  percent: 30,
  theme: 'secondary'
}

export const Success = Template.bind({});
Success.args = {
  percent: 30,
  theme: 'success'
}

export const NotShowText = Template.bind({});
NotShowText.args = {
  percent: 30,
  theme: 'success',
  showText: false
}


