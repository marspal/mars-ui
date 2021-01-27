import React, {FC, useState, ChangeEvent, KeyboardEvent, useEffect, ReactElement, useRef} from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutSide from '../../hooks/useClickOutSide';

// 处理复杂的数据结构
interface DataSourceObject{
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOptions?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps>  = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props;
  // 解决inputValue 报错
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutSide(componentRef, ()=> {
    setSuggestions([]);
  });
  
  const debouncedValue = useDebounce(inputValue, 500)
  useEffect(()=>{
    if(debouncedValue && triggerSearch.current){
      const results = fetchSuggestions(debouncedValue);
      if(results instanceof Promise){ // 处理异步
        console.log('trigger');
        setLoading(true);
        results.then(data => {
          setSuggestions(data);
        }).finally(()=>{
          setLoading(false);
        });
      }else{
        setSuggestions(results);
      }
    }else{
      setSuggestions([]);
    }
    // 忘记过去
    setHighlightIndex(-1);
  },[debouncedValue, fetchSuggestions]);
  const highlight = (index: number) => {
    if(index < 0) index = 0;
    if(index >= suggestions.length - 1){
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode){
      case 13: // enter
        //  需要解决另外一次搜索 useRef
        if(suggestions[highlightIndex]){
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break; //shang
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27: // esc
        setSuggestions([]);
        break;
      default:
        break;

    }
  }
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  }
  // console.log(suggestions);
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    onSelect && onSelect(item);
    triggerSearch.current = false;
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions? renderOptions(item) : item.value
  }
  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const c_names = classNames("suggestion-item", {
            "is-active": index === highlightIndex
          });
          return (
            <li key={index} onClick={()=>handleSelect(item)} className={c_names}>{
              renderTemplate(item)
            }</li>
          );
        })}
      </ul>
    );
  }
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input 
        value={inputValue}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <ul><Icon icon="spinner"spin/></ul>}
      {suggestions && generateDropDown()}
    </div>
  );
}

export default AutoComplete;