import React from 'react';
import { Story, Meta } from '@storybook/react';

import Virtual, {IVirtualProps} from './virtual';

export default {
  title: "Virtual",
  component: Virtual,
  argTypes: { onSelect: { action: 'selected' } }
} as Meta;
let d:any[] = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}

const style = {
  border: '1px solid #eee'
}
const Template: Story<IVirtualProps> = (args) => {
  return <Virtual {...args}/>
}
export const Default = Template.bind({});
Default.args = {
  data: d,
  style,
  screenHeight: 300,
  itemSize: 30,
};