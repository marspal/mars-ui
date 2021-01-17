import React from 'react';
import Icon from './icon';
import { storiesOf } from '@storybook/react';

// export default {
//   component: Icon,
//   title: 'Icon Component'
// }

export const basic = () => {
  return (
    <>
      <Icon icon="coffee"/>
    </>
  );
}

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

storiesOf("Icon", module)
  .add("basic", basic)
  .add("iconWithTheme", iconWithTheme);