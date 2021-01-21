import React, {FC, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react';
import classnames from 'classnames';

type ButtonSize = "lg" | "sm";
type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  /**
   * 设置Button的禁用 
   */
  disabled?: boolean;
  /**Button的大小,lg|sm, 默认值无*/
  size?: ButtonSize;
  /**Button的类型，primary、default、danger、link,默认值为default */
  btnType?: ButtonType;
  /**BtnType为Link时且href存在时为A */
  href?: string;
}
// &交叉类型
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
// Partial 设置可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * Button组件库
 * import {Button} from 'sparksharing'
*/
export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    className,
    disabled,
    size,
    btnType,
    href,
    children,
    ...restProps
  } = props;
  // btn btn-primary btn-lg
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    // 链接本身没有disabled属性
    disabled: (btnType === 'link') && disabled // 有href的时候显示
  });
  if(btnType === 'link' && href){
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    );
  }else{
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    );
  }
}
Button.defaultProps = {
  btnType: "default",
  disabled: false
};
export default Button;