import { debounce, throttle } from "lodash";
import { useCallback } from "react";

const useThrottledDebouncedCallback = (callback: (...params: any) => void, delayed: number) => {
  const throttleSearch = useCallback(throttle(callback, delayed), []);
  const debounceSearch = useCallback(debounce(callback, delayed), []);
  return (...params: any) => {
    throttleSearch(...params);
    debounceSearch(...params);
  }
}

export default useThrottledDebouncedCallback;