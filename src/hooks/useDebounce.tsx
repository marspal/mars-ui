import  { useState, useEffect } from "react";

function useDebounce(value: any, delay:number = 300){
  const [debouncedValue, setDebounceValue] = useState(value);
  useEffect(()=>{
    const handler = window.setTimeout(()=>{
      setDebounceValue(value)
    },delay);
    return () => clearTimeout(handler); 
  }, [value, delay]);
  return debouncedValue;
}   

export default useDebounce;