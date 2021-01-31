import React, { FC, HTMLAttributes, useCallback, useState } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Transition from "../Transition/transition";

export type AlertType = 'success' | 'info' | 'danger' | 'warning';

export interface IAlertProps extends HTMLAttributes<HTMLElement>{
  type?: AlertType;
  title?: string; // string 组件是一个ReactElement组件吗
  message: string;
  showClose?: boolean;
}

export const Alert: FC<IAlertProps> = (props) => {
  const {
    type,
    title,
    message,
    showClose,
    className,
    ...restProps
  } = props;
  const [close, setClose] = useState(true);
  // alert alert-success
  const classes = classnames("alert", className, {
    [`alert-${type}`]: type
  });
  // todo 升级成useMome形式
  const handleCloseCallback = useCallback(() => {
    setClose(false);
  }, []);
  return (
    <Transition in={close} animation="zoom-in-top" timeout={300}>
      <div className={classes} {...restProps} data-testid="alert-test">
        {title && <span className="alert-title">{title}</span>}
        <span>{message}</span>
        {showClose && 
          <span className="icon-close" >
            <Icon icon="times" onClick={handleCloseCallback}/>
          </span>
        }
      </div>
    </Transition>
  );
}

Alert.defaultProps = {
  showClose: false,
  type: 'info'
}

export default Alert;