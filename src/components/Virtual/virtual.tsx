import React, {FC, CSSProperties, useState, useRef, useEffect} from 'react';
import classnames from 'classnames';

export interface IVirtualProps {
  style?: CSSProperties,
  className?: string,
  list: any[]
}
const itemSize = 30;
const bufferScale = 0.5;
export const Virtual: FC<IVirtualProps> = props => {
  const {
    className,
    list,
    style
  } = props;
  let [start, setStart] = useState<Number>(0);
  let [end, setEnd] = useState<Number>(0);
  let [visibleData, setVisibleData] = useState<any[]>([]);
  let [listHeight, setListHeight] = useState<Number>(0);
  let [startOffset, setStartOffset] = useState<Number>(0);
  let virtual = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(list.length && virtual.current){
      // 列表总高度
      let listHeight = list.length * itemSize;
      let scrollTop = virtual.current.scrollTop;
      let screenHeight = virtual.current.clientHeight;
      let start = Math.floor(scrollTop / itemSize);
      let visibleCount = Math.ceil(screenHeight / itemSize);
      let above = Math.min(start, bufferScale * visibleCount);
      let end = start + visibleCount;
      let below = end +  bufferScale * visibleCount;
      let visibleData = list.slice(start - above, start + visibleCount +below);
      
      setStart(start);
      setEnd(end);
      setListHeight(listHeight);
      setVisibleData(visibleData);
      
      // console.log(listHeight, scrollTop, screenHeight, start, '===');
    }
  }, [list, virtual]);
  const klass = classnames('virtual-container', className);
  const handleScroll = () => {
    if (virtual.current) {
      let scrollTop = virtual.current.scrollTop;
      let screenHeight = virtual.current.clientHeight;
      let start = Math.floor(scrollTop / itemSize);
      let visibleCount = Math.ceil(screenHeight / itemSize);
      let startOffset = scrollTop - (scrollTop % itemSize);
      let above = Math.min(start, bufferScale * visibleCount);
      let end = start + visibleCount;
      let below = end +  bufferScale * visibleCount;
      let visibleData = list.slice(start + above, start + visibleCount + below);
      setStart(start);
      setEnd(end);
      setStartOffset(startOffset)
      setVisibleData(visibleData);
      // console.log(virtual.current.scrollTop);
    }
  }
  console.log(start, end);
  return (
    <div 
      ref={virtual}
      style={style}
      className={klass}
      onScroll={handleScroll}
    >
      <div className="virtual-phantom" style={{height: `${listHeight}px`}}></div>
      <div className="virtual-list" style={{
        transform: `translate3d(0, ${startOffset}px, 0)`
      }}>
        {
          visibleData.map(item => {
            return <div key={item.key} className="virtual-list-item">{item.value}</div>
          })
        }
      </div>
    </div>
  );
}
Virtual.defaultProps = {
  list: []
};
export default Virtual;