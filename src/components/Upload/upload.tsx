import React, { FC, useRef, ChangeEvent, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface IUploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any
}
export interface IUploadProps {
  action: string;
  defaultFileList?: IUploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?:  (data: any, file: File) => void;
  onError?:    (err : any, file: File) => void;
  onChange?:   (file: File) => void;
  onRemove?:   (file: IUploadFile) => void;
  headers?: {[key: string]: any};
  name?: string;
  data?: {[key: string]: any};
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}
export const Upload: FC<IUploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onError,
    onSuccess,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<IUploadFile[]>(defaultFileList || []);
  const updateFileList = (updateFile: IUploadFile, updateObj: Partial<IUploadFile>) => {
    setFileList((prevList)=>{
      return prevList.map(file => {
        if(file.uid === updateFile.uid){
          return {...file, ...updateObj};
        }else{
          return file;
        }
      });
    });
  } 
  const handleClick = () => {
    if(fileInput.current){
      fileInput.current.click();
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files){
      return;
    }
    uploadFiles(files);
    if(fileInput.current){ // 清空上传文件
      fileInput.current.value="";
    }
  }
  const handleRemove = (file: IUploadFile) => {
    setFileList((prevList)=>{
      return prevList.filter(item => item.uid !== file.uid);
    });
    if(onRemove){
      onRemove(file);
    }
  }
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files); // 转换成数组
    postFiles.forEach(file => {
      if(!beforeUpload){
        post(file);
      }else{
        const result = beforeUpload(file);
        if(result && result instanceof Promise){
          result.then(processedFile =>{
            post(processedFile);
          })
        } else if(result !== false){
          post(file);
        }
      }
    })
  }

  const post = (file: File) => {
    let _file: IUploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    };
    // setFileList([_file,...fileList]);
    setFileList((prevList) => [_file,...prevList]);
    const formData = new FormData();
    formData.append(name || 'file', file);
    if(data){
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data"
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded*100) / e.total) || 0;
        if(percentage < 100){
          updateFileList(_file, {percent: percentage, status: "uploading"});
          onProgress && onProgress(percentage, file);
        }
      }
    }).then(resp => {
      // console.log(resp);
      updateFileList(_file, {percent: 100, status: "success", response: resp.data});
      onSuccess && onSuccess(resp.data, file);
      if(onChange){
        onChange(file);
      }
    }).catch(err => {
      console.log(err);
      updateFileList(_file, {status: "error", error: err});
      onError && onError(err, file);
      if(onChange){
        onChange(file);
      }
    });
    // console.log(_file);
  }

  return (
    <div className="upload-component">
      <div 
        className="upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}
      >
        {drag? <Dragger onFile={(files)=>{uploadFiles(files)}}>
          {children}
        </Dragger>: children}
        <input 
          type="file" 
          style={{display: 'none'}}
          className="file-input"
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList
        fileList = {fileList}
        onRemove={handleRemove}
      />
    </div>
  );
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload;