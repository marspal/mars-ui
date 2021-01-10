import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload, { IUploadFile } from './upload';
import { action } from '@storybook/addon-actions';
import Icon from '../Icon/icon';

const checkFileSize = (file: File) => {
  if(Math.round(file.size / 1024) > 50){
    alert("file too big");
    return false;
  }
  return true;
}
// const filePromise = (file: File) => {
//   const newFile = new File([file], "new_name.docx", {type: file.type});
//   return Promise.resolve(newFile);
// }

const defaultFileList: IUploadFile[] = [
  {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30},
  {uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30},
  {uid: '124', size: 1234, name: 'eyiha.md', status: 'error', percent: 30},
];
const SimpleUpload = () => {
  return <Upload 
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    onChange={action("changed")}
    // beforeUpload={checkFileSize}
    defaultFileList={defaultFileList}
    onRemove={action("removed")}
    name="fileName"
    data={{'key': 'value'}}
    headers={{"X-Powered-By": 'viking'}}
    accept=".bmp"
    multiple
    drag
  > 
    <Icon icon="upload" size="5x" theme="secondary"></Icon>
    <br/>
    <p>Drag file over to upload</p>
  </Upload>
}

storiesOf("Upload component", module)
  .add("Upload", SimpleUpload);