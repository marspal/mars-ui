import { FC } from 'react';
import Menu, {IMenuProps} from './menu';
import SubMenu, {ISubMenuProps} from './subMenu';
import MenuItem, {MenuItemProps} from './menuItem';

export type IMenuComponent = FC<IMenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<ISubMenuProps>
}

const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;