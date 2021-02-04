import React, {
  FC,
  CSSProperties,
  useState,
  useRef,
  RefObject,
  useEffect,
  useCallback,
  ReactElement
} from 'react';
import classnames from 'classnames';
interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface IVirtualProps {
  style?: CSSProperties;
  className?: string;
  screenHeight: number;
  itemSize: number;
  data?: DataSourceType[];
  bufferScale?: number;
  onSelect?: (item: DataSourceType) => void;
  renderOptions?: (item: DataSourceType) => ReactElement;
}

export const Virtual: FC<IVirtualProps> = props => {
  const {
    className,
    screenHeight,
    itemSize,
    data,
    bufferScale,
    style,
    renderOptions,
    onSelect
  } = props;

  let virtualContainerRef = useRef<HTMLDivElement>(null);
  let [visibleData, setVisibleData] = useState<any[]>([]);
  let [contentHeight, setContentHeight] = useState<number>(0);
  let [startOffset, setStartOffset] = useState<number>(0);
  // css样式处理
  let containerStyle = Object.assign({height: `${screenHeight}px`}, style);
  let containerClassName = classnames('virtual-container', className);
  useEffect(() => {
    computeVisibleData(data!, virtualContainerRef);
  }, [data, virtualContainerRef]);

  const handleContainerScroll = useCallback(() => {
    computeVisibleData(data!, virtualContainerRef);
  }, [data, virtualContainerRef]);

  const computeVisibleData = (data: any[], ref: RefObject<HTMLDivElement>) => {
    if (data && data.length && ref.current) {
      const contentHeight = data.length * itemSize;
      const screenHeight = ref.current.clientHeight;
      const scrollTop = ref.current.scrollTop;

      const visibleCount = Math.ceil(screenHeight / itemSize);
      const start = Math.floor(scrollTop / itemSize);
      const end = start + visibleCount;
      
      const above = Math.min(start, bufferScale! * visibleCount);
      const below = Math.min(data.length - end, bufferScale! * visibleCount);
      const visibleData = data.slice(start - above, end + below);
      
      setVisibleData(visibleData);
      setContentHeight(contentHeight);
      setStartOffset(scrollTop - above * itemSize);
    }
  } 
  const handleSelect = (item: DataSourceType) => {
    onSelect && onSelect(item);
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;  
  }
  return (
    <div 
      ref={virtualContainerRef}
      style={containerStyle}
      className={containerClassName}
      onScroll={handleContainerScroll}
    >
      <div className="virtual-phantom" style={{height: `${contentHeight}px`}}></div>
      <ul className="virtual-list" style={{
        transform: `translate3d(0, ${startOffset}px, 0)`
      }}>
        {
          visibleData.map((item, index) => {
            const c_name = classnames('virtual-item');
            return (
              <li key={index} onClick={() => handleSelect(item)} className={c_name}>
                {renderTemplate(item)}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
Virtual.defaultProps = {
  data: [],
  bufferScale: 1
};
export default Virtual;