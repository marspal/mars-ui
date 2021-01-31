import React from 'react';
import { Story, Meta } from '@storybook/react';
import Upload, { IUploadFile, IUploadProps } from './upload';
import Icon from '../Icon/icon';

export default {
  title: 'Upload',
  component: Upload
} as Meta;

const defaultFileList: IUploadFile[] = [
  {uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30},
  {uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30},
  {uid: '124', size: 1234, name: 'eyiha.md', status: 'error', percent: 30},
];

const Template: Story<IUploadProps> = args => {
  return <Upload 
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    // beforeUpload={checkFileSize}
    defaultFileList={defaultFileList}
    name="fileName"
    data={{'key': 'value'}}
    headers={{"X-Powered-By": 'viking'}}
    multiple
    drag
  > 
    <Icon icon="upload" size="5x" theme="secondary"></Icon>
    <br/>
    <p>Drag file over to upload</p>
  </Upload>
};

export const Default = Template.bind({});
Default.args = {
};
