import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames'
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm'

// 忽略掉
export interface InputProps  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  disabled?: boolean,
  size?: InputSize,
  icon?: IconProp,
  prepend?: string | ReactElement,
  append?: string | ReactElement,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = (props) => {
  // 取出所有的属性
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props;

  const classes = classNames("input-wrapper", {
    [`input-size-${size}`] : size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  });

  //解决value 为undefined 的情况
  const fixControlledValue = (value: any) => {
    if(typeof value === 'undefined' || value === null){
      return '';
    }
    return value;
  }
  // value defaultValue 不能同时存在, 有value 则去掉defaultValue
  if('value' in restProps){
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(restProps.value);
  }

  // 根据属性计算不太的className
  return (
    // 根据属性判断是否要添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="sp-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input className="input-inner" disabled={disabled} {...restProps}/>
      {append && <div className="sp-input-group-append">{append}</div>}
    </div>
  );
}

export default Input;