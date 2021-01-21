import React from 'react';
import { config } from 'react-transition-group';
import {render} from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Alert, {AlertType} from './alert';

config.disabled = true;
jest.mock('../Icon', () => {
  return ({icon, onClick}: any) => {
    return <span onClick={onClick}>{icon}</span>
  }
});

const defaultProps = {
  message: 'this is default'
}

const otherProps = {
  message: 'this is default',
  showClose: true,
  title: 'Test Title',
  type: 'success' as AlertType,
  className: 'aacss',
  onClick: jest.fn()
}
describe("Test Alert Component", () => {
  it("should render correct default component ", () => {
    const wrapper = render(<Alert {...defaultProps}/>);
    const element = wrapper.getByTestId("alert-test");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alert alert-info");
    const messageElement = wrapper.getByText("this is default");
    expect(messageElement).toBeInTheDocument();
  });
  it("should render correct component by provided props", () => {
    const wrapper = render(<Alert {...otherProps}/>);
    const element = wrapper.getByTestId("alert-test");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alert alert-success aacss");
    const messageElement = wrapper.queryByText("this is default");
    expect(messageElement).toBeInTheDocument();
    const closeElement = wrapper.getByText("times");
    expect(closeElement).toBeInTheDocument();
    useEvent.click(closeElement);
    expect(otherProps.onClick).toHaveBeenCalled();
    expect(element).not.toBeInTheDocument()
  });
});