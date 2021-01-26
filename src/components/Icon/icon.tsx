import React, { FC } from 'react';
import classnames from 'classnames';
import {FontAwesomeIconProps, FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' 
  | 'warning' | 'danger' | 'light' | 'dark';

export interface IIconProps extends FontAwesomeIconProps {
  /**Icon的类型 */
  theme?: ThemeProps
}
/**
 * Icon组件库
 * import {Icon} from 'mars-ui-pro'
 */
export const Icon: FC<IIconProps> = (props) => {
  const {className, theme, ...restProps} = props;
  const classes = classnames("icon", className, {
    [`icon-${theme}`]: theme
  });

  return (
    <FontAwesomeIcon className={classes} {...restProps}/>
  );
}

export default Icon;