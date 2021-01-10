import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu, {IMenuProps} from './menu'
import MenuItem from './menuItem';
import SubMenu from './subMenu';
library.add(fas)
jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock("react-transition-group", () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    } 
  }
});
const testProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps:IMenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}

const generateMenu = (props: IMenuProps) => {
  return<Menu {...props}>
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
const createStyleFile = ()=>{
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
}
let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe("test menu and MenuItem component", () => {
  // 解决多个case重复创建元素
  beforeEach(()=>{
    wrapper = render(generateMenu(testProps));
    // 插入节点
    wrapper.container.append(createStyleFile())
    // 取出最外层元素
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", ()=>{
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    expect(menuElement.querySelectorAll(":scope > li ").length).toEqual(5);
    // 不分层次：使用:scope解决
    // expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  })
  it("click items should change active and call the rigth callback", ()=>{
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  })
  it("should render vertical mode when mode is set to vertical", ()=>{
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    menuElement = wrapper.getByTestId("test-menu");
    // 出现错误 Found multiple elements by: [data-testid="test-menu"]
    // 解决办法cleanup
    expect(menuElement).toHaveClass("menu-vertical");
  })
  it("should render dropdown items when hover on subMenu", async ()=>{
    // 问题 解决visible问题, 需要添加一些css
    
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    // 有异步 解决异步 await
    await wait(()=>{
      expect(wrapper.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("drop1"));
    expect(testProps.onSelect).toBeCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement)
    await wait(()=>{
      expect(wrapper.queryByText("drop1")).not.toBeVisible();
    });
  })
});

describe("test Menu and MenuItem in vertical mode", () => {
  beforeEach(()=>{
    wrapper2 =  render(generateMenu(testVerProps));
    wrapper2.container.append(createStyleFile());
  });
  it("should render vertical mode when mode is set to vertical", () => {
    const menuElement = wrapper2.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  })
  it("should show dropdown items when click on subMenu for vertical mode", ()=>{
    const dropDownItem = wrapper2.queryByText("drop1");
    expect(dropDownItem).not.toBeVisible();
    fireEvent.click(wrapper2.getByText("dropdown"));
    expect(dropDownItem).toBeVisible();
  })
  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", ()=>{
    expect(wrapper2.getByText("opened1")).toBeVisible();
  })
})