import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from "./button";
const defaultProps = {
  onClick: jest.fn()
}

const primaryProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}
describe("Test Button Component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled()
  });
  it("should render the correct button based on different", () => {
    const wrapper = render(<Button {...primaryProps}>Nice</Button>);
    const element = wrapper.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-primary btn-lg klass");
  });
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(<Button btnType="link" href="http://dummyurl">Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>Disabled</Button>);
    // 使用类型断言获取对应的元素的属性
    const element = wrapper.getByText("Disabled") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});