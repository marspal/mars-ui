import React, { useState } from 'react';
import classnames from "classnames";
import { MenuItemProps } from './menuItem';

// String Literal Types
// type Easing = "ease-in" | "ease-out" | "ea-in-out"
type SelectCallback = (selectedIndex: string) => void
type MenuMode = "horizontal" | "vertical";

interface IMenuContext{
  index: string,
  onSelect?: SelectCallback,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<IMenuContext>({index: '0'});
export interface IMenuProps {
  defaultIndex?: string,
  className?: string
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: SelectCallback,
  defaultOpenSubMenus?: string[]
}
export const Menu: React.FC<IMenuProps> = (props) => {
  const {className,mode,style,children,defaultIndex,onSelect,defaultOpenSubMenus} = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classnames("menu", className, {
    "menu-vertical": mode === 'vertical',
    "menu-horizontal": mode !== "vertical"
  });
  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  }
  const passedContext: IMenuContext = {
    index: currentActive? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };
  // 获取操作children的能力
  // child 
  const renderChildren = () => {
    return React.Children.map(children, (child, index)=>{
      // 转化Component实例 FunctionComponentElement 需要传入参数
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const {displayName} = childElement.type;
      if(displayName === "MenuItem" || displayName==="SubMenu"){
        // 自动添加自动index
        return React.cloneElement(childElement, {
          index: index.toString()
        });
      }else {
        console.error("Warning: Menu has a child which is not a MenuItem component");
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}        
      </MenuContext.Provider>
    </ul>
  );
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}
export default Menu;