import React, { useState } from  'react';
import {Story} from '@storybook/react';
import Input, {IInputProps} from './input';

const ControlledInput = ()=> {
  const [value, setValue] = useState<any>('123123');
  return <Input defaultValue={value} onChange={(e) => setValue(e.target.value)}/>
}

export default {
  title: 'Input',
  component: Input
};

const Template: Story<IInputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'placeholder',
  style: {width: '300px'}
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'disabled placeholder',
  disabled: true
};

export const WidthIcon = Template.bind({});
WidthIcon.args = {
  placeholder: 'Input with icon',
  icon: 'search'
};

export const BgInput = Template.bind({});
BgInput.args = {
  placeholder: 'big Input',
  size: 'lg'
};

export const SmInput = Template.bind({});
BgInput.args = {
  placeholder: 'small Input',
  size: 'sm'
};

export const InputWithAppend = Template.bind({});
InputWithAppend.args = {
  placeholder: 'input with append',
  prepend: 'https://',
  append: 'www.baidu.com'
};

// const defaultInput = () => {
//   return <>
//     <Input 
//       style={{width: '300px'}}
//       placeholder="placeholder"
//       onChange={action('changed')}
//     />
//     <ControlledInput />
//   </>
// }

// storiesOf("Input", module)
//   .add("Input", defaultInput);