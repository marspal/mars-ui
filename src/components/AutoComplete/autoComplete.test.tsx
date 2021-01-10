import React from 'react';
import { config } from 'react-transition-group';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { RenderResult, render, fireEvent, wait, cleanup } from '@testing-library/react';
import AutoComplete, { AutoCompleteProps, DataSourceType } from './autoComplete';
config.disabled = true;
library.add(faSpinner);

const testArray = [
  {value: 'ab', number: 11},
  {value: 'abc', number: 112},
  {value: 'b', number: 131},
  {value: 'c', number: 141},
];
const renderOption = (item: DataSourceType) => <div className="template">
  {item.value}
</div>
const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

const testPropsWithRenderOption: AutoCompleteProps = {
  fetchSuggestions: (query) => {return testArray.filter(item => item.value.includes(query))},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
  renderOptions: renderOption
}

const testPropsWithAsyncFetch: AutoCompleteProps = {
  fetchSuggestions: (query) => {return new Promise((resolve, reject) => {
    resolve(testArray);
  })},
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}


let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("test AutoComplete component", () => {
  beforeEach(()=>{
    wrapper = render(<AutoComplete {...testProps}></AutoComplete>)
    inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
  });
  it("test basic AutoComplete behavior", async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}});
    await wait(()=>{
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
      expect(wrapper.queryByText("abc")).toBeInTheDocument();
    });
    expect(wrapper.container.querySelectorAll(".suggestion-item").length).toEqual(2);
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({value: 'ab', number: 11});
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(wrapper.queryByText("abc")).not.toBeInTheDocument();
    //fill the input
    expect(inputNode.value).toBe('ab')
  });
  it("should provide keyboard support",async () => {
    fireEvent.change(inputNode, {target: {value: "a"}});
    await wait(()=>{
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");
    // arrow down
    fireEvent.keyDown(inputNode, {keyCode: 40});
    expect(firstResult).toHaveClass("is-active");
    // arrow down
    fireEvent.keyDown(inputNode, {keyCode: 40});
    expect(secondResult).toHaveClass("is-active");
    // arrow up
    fireEvent.keyDown(inputNode, {keyCode: 38});
    expect(firstResult).toHaveClass("is-active");
    // enter
    fireEvent.keyDown(inputNode, {keyCode: 13});
    expect(firstResult).not.toBeInTheDocument();
    expect(secondResult).not.toBeInTheDocument();
    expect(inputNode.value).toEqual("ab");
    expect(testProps.onSelect).toHaveBeenCalledWith({value: "ab", number: 11});
  });
  it("click outside should hide the dropdown", async () => {
    fireEvent.change(inputNode, {target: {value: 'a'}});
    await wait(()=>{
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument();
  });
  it("renderOption should generate the right template", async () => {
    cleanup();
    let wrapper: RenderResult = render(<AutoComplete {...testPropsWithRenderOption}></AutoComplete>);
    let inputNode: HTMLInputElement = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
    fireEvent.change(inputNode, {target: {value: 'a'}});
    
    await wait(() => {
      const firstResult = wrapper.queryByText("ab");
      const secondResult = wrapper.queryByText("abc");
      expect(firstResult).toBeInTheDocument();
      expect(secondResult).toBeInTheDocument();
      expect(firstResult?.tagName).toEqual("DIV");
      expect(secondResult?.tagName).toEqual("DIV");
      expect(firstResult).toHaveClass("template");
    });
    fireEvent.click(wrapper.getByText("ab"));
    expect(testPropsWithRenderOption.onSelect).toBeCalledWith({value: "ab", number: 11});
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toEqual("ab");
  });
  it("async fetchSuggestions should works fine",async () => {
    cleanup();
    let wrapper: RenderResult = render(<AutoComplete {...testPropsWithAsyncFetch}></AutoComplete>);
    let inputNode: HTMLInputElement = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
    fireEvent.change(inputNode, {target: {value: 'a'}});
    await wait(()=>{
      expect(wrapper.getByText('ab')).toBeInTheDocument();
    });
    fireEvent.click(wrapper.getByText("ab"));
    expect(testPropsWithAsyncFetch.onSelect).toBeCalledWith({value: "ab", number: 11});
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toEqual("ab");
  });
});