import React from 'react';
import { Story, Meta } from '@storybook/react';
import Virtual, {IVirtualProps} from './virtual';

export default {
  title: "Virtual",
  component: Virtual
} as Meta;
let d:any[] = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}

const Template: Story<IVirtualProps> = (args) => {
  return <Virtual list={d} style={{
    border: '1px solid #eee'
  }}/>
}

export const Default = Template.bind({});
Default.args = {};