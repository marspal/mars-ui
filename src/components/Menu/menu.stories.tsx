import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu, { IMenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const generateMenu = () => {
  const testProps: IMenuProps = {
    defaultIndex: '0',
    className: 'test'
  }
  return<Menu {...testProps}>
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


storiesOf('Menu Component', module)
.add('Menu', generateMenu )