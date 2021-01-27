import React from  'react';
import {render,fireEvent} from '@testing-library/react';
import Input from './input';
const defaultProps = {
  placeholder: "test-input"
};

describe("test Input Component", () => {
  it("should render the correct default Input", () => {
    const wrapper = render(<Input {...defaultProps}/>);
    const testNode = wrapper.getByPlaceholderText("test-input");
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("input-inner");
  });
  it("should render the disabled on disabled property", ()=>{
    const wrapper = render(<Input placeholder="disabled" disabled/>);
    const testNode = wrapper.getByPlaceholderText("disabled") as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it("should render the disabled Input on disabled property", () => {
    const wrapper = render(<Input placeholder="sizes" size="lg"/>);
    const testNode = wrapper.container.querySelector(".input-wrapper")
    expect(testNode).toHaveClass("input-size-lg");
  })
  it("should render prepend and append on prepend/append property", () => {
    const {queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com"/>);
    const testContainer = container.querySelector('.input-wrapper');
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend');
    expect(queryByText("https://")).toBeInTheDocument();
    expect(queryByText(".com")).toBeInTheDocument();
  })
});