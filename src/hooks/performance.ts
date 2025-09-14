import { useMemo, useCallback, useState, useEffect, useRef } from "react";

/**
 * Custom hooks for performance optimization
 */

/**
 * Memoized callback with dependencies
 */
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
) => {
  return useCallback(callback, deps);
};

/**
 * Memoized value with heavy computation
 */
export const useExpensiveComputation = <T>(computeFn: () => T, deps: any[]) => {
  return useMemo(computeFn, deps);
};

/**
 * Debounced value hook
 */
export const useDebouncedValue = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Previous value hook for comparisons
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
