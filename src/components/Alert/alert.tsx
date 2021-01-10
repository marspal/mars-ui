import React, { FC, HTMLAttributes, useState } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';
import Transition from "../Transition/transition";

export type AlertType = 'success' | 'info' | 'danger' | 'warning';

interface AlertProps extends HTMLAttributes<HTMLElement>{
  type?: AlertType;
  title?: string; // string 组件是一个ReactElement组件吗
  message: string;
  showClose?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
  const {
    className,
    type,
    title,
    message,
    showClose,
    ...restProps
  } = props;
  const [close, setClose] = useState(true);
  // alert alert-success
  const classes = classnames("alert", className, {
    [`alert-${type}`]: type
  });
  const handleClose = () => {
    setClose(false);
  }
  return (
    <Transition in={close} animation="zoom-in-top" timeout={300}>
      <div className={classes} {...restProps} data-testid="alert-test">
        {title && <span className="alert-title">{title}</span>}
        <span>{message}</span>
        {showClose && 
          <span className="icon-close" >
            <Icon icon="times" onClick={handleClose}/>
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