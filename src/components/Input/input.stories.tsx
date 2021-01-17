import React, { useState } from  'react';
import { action } from '@storybook/addon-actions';
import Input from './input';
import { storiesOf } from '@storybook/react';
const ControlledInput = ()=> {
  const [value, setValue] = useState<any>('123123');
  return <Input defaultValue={value} onChange={(e) => setValue(e.target.value)}/>
}
const defaultInput = () => {
  return <>
    <Input 
      style={{width: '300px'}}
      placeholder="placeholder"
      onChange={action('changed')}
    />
    <ControlledInput />
  </>
}

storiesOf("Input", module)
  .add("Input", defaultInput);