import React from 'react';
import {Story, Meta} from '@storybook/react';
import Icon, {IIconProps} from './icon';

export default {
  title: 'Icon',
  component: Icon
} as Meta;

const Template: Story<IIconProps> = (args) => {
  return <Icon {...args} />
}

export const Success = Template.bind({});
Success.args = {
  theme: 'success',
  icon: 'coffee'
};


export const iconWithTheme = () => {
  return (
    <>
      <Icon icon="coffee" theme="primary"/>
      <Icon icon="coffee" theme="secondary"/>
      <Icon icon="coffee" theme="success"/>
      <Icon icon="coffee" theme="info"/>
      <Icon icon="coffee" theme="warning"/>
      <Icon icon="coffee" theme="danger"/>
      <Icon icon="coffee" theme="light"/>
      <Icon icon="coffee" theme="dark"/>
    </>
  );
}