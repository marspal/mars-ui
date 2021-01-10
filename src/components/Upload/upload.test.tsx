import React from 'react';
import { RenderResult, render, fireEvent, wait, createEvent } from '@testing-library/react';
import Upload, { IUploadProps } from './upload';
import axios from 'axios';

jest.mock("../Icon/icon", () => {
  return ({icon, onClick}: any) => {
    return <span onClick={onClick}>{icon}</span>
  }
});
jest.mock("axios");
// 使用axios 提示类型 解决 mockImplementation无提示问题
const mockedAxios = axios as jest.Mocked<typeof axios>
const defaultProps: IUploadProps = {
  action: "fakeurl",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(['xyz'], "test.png", {type: 'image/png'});
describe("Test Upload Component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...defaultProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector(".file-input") as HTMLInputElement;
    uploadArea = wrapper.getByText('Click to upload');
  });
  it("upload process should works fine", async () => {
    const {queryByText, getByText} = wrapper;
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    // mockedAxios.post.mockImplementation(()=>Promise.resolve({
    //   data: 'cool'
    // }));
    mockedAxios.post.mockResolvedValue({data: 'cool'});
    fireEvent.change(fileInput, {target: {
      files: [testFile]
    }})
    expect(queryByText('spinner')).toBeInTheDocument()
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    });
    // 图标已经转化成文字
    expect(queryByText("check-circle")).toBeInTheDocument();
    expect(defaultProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
    expect(defaultProps.onChange).toHaveBeenCalledWith(testFile);

    // 删除文件， 没有css 直接可以使用
    const times = getByText("times");
    expect(times).toBeInTheDocument();
    fireEvent.click(times);
    // icon需要加上 onClick
    expect(queryByText("test.png")).not.toBeInTheDocument();
    expect(defaultProps.onRemove).toBeCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }));
  });
  it("drag and drop files should works fine", async () => {
    const {queryByText} = wrapper;
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");

    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");
    // jest this appears to be an issue with jsdom not supporting dataTransfer
    // fireEvent.drop(uploadArea, {dataTransfer: {files: [testFile]}});
    // await wait(() => {
    //   expect(queryByText('test.png')).toBeInTheDocument();
    // });

    // react testing library drag and drop 解决问题: 通过createEvent自定义事件
    const fileDropEvent  = createEvent.drop(uploadArea);
    Object.defineProperty(fileDropEvent, "dataTransfer", {
      value: {
        files: [testFile]
      }
    });
    fireEvent(uploadArea, fileDropEvent)
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    });
    expect(defaultProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  })
});