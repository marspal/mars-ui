import React, { FC } from "react";
import {CSSTransition} from "react-transition-group";
import {CSSTransitionProps} from "react-transition-group/CSSTransition";

type animationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-right" | "zoom-in-bottom";
interface BaseTransitionProps {
  animation?: animationName,
  wrapper?: boolean, // 解决transition之间的冲突, 添加后 父与子相安
}

export type TransitionProps = BaseTransitionProps & CSSTransitionProps;

const Transition: FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props;

  return (
    <CSSTransition
      classNames={classNames? classNames: animation}
      {...restProps}
    > 
      {/* 不需要做验证 CSSTransition添加验证*/}
      {wrapper? <div>{children}</div>: children}
    </CSSTransition>
  );
}
Transition.defaultProps = {
  appear: true,
  unmountOnExit: true
}
export default Transition;