import React from 'react';
import {storiesOf}  from '@storybook/react';

storiesOf("Welcome", module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 sparksharing 的世界</h1>
        <p>sparksharing 搭建整个开发流程</p>
        <h3>安装试试</h3>
        <code>
          npm install sparksharing --save
        </code>
      </>
    );
  }, {info: {disable: true}});