import React from 'react';
import { Story, Meta } from '@storybook/react';
import Menu, { IMenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const generateMenu = (args: IMenuProps) => {
  return<Menu {...args}>
    <MenuItem>
      active
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
      xyz
    </MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
    </SubMenu>
    <SubMenu title="opened">
      <MenuItem>
        opened1
      </MenuItem>
    </SubMenu>
  </Menu>
} 

export default {
  title: "Menu",
  component: Menu
} as Meta;


const Template: Story<IMenuProps> = (args) => generateMenu(args);
export const VerticalMode = Template.bind({});
VerticalMode.args = {
  defaultIndex: '0',
  className: 'test',
  mode: "vertical"
}

export const HorizontalMode = Template.bind({});
HorizontalMode.args = {
  defaultIndex: '0',
  className: 'test',
  mode: 'horizontal'
};