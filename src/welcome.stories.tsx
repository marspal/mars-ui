import React from 'react';
import {Story} from '@storybook/react';

const WelcomeTemp = () => (
  <>
    <h1>欢迎来到 mars-ui-pro 的世界</h1>
    <p>mars-ui-pro 搭建整个开发流程</p>
    <h3>安装试试</h3>
    <code>
      npm install mars-ui-pro --save-dev
    </code>
  </>
);

export default {
  title: 'Welcome',
  component: WelcomeTemp
};

const Template: Story<any> = () => <WelcomeTemp />;

export const Welcome = Template.bind({});
Welcome.args = {};
