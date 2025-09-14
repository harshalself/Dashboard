// Performance optimization utilities
export const performanceUtils = {
  /**
   * Debounced search function for better UX
   */
  createDebouncedSearch: (callback: (value: string) => void, delay = 300) => {
    let timeoutId: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(value), delay);
    };
  },

  /**
   * Throttle function for scroll events, resize events, etc.
   */
  throttle: <T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout | null;
    let lastExecTime = 0;
    return (...args: Parameters<T>) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  },

  /**
   * Memoization for expensive computations
   */
  memoize: <TArgs extends unknown[], TReturn>(
    fn: (...args: TArgs) => TReturn,
    getKey?: (...args: TArgs) => string
  ) => {
    const cache = new Map<string, TReturn>();

    return (...args: TArgs): TReturn => {
      const key = getKey ? getKey(...args) : JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key)!;
      }

      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  },

  /**
   * Virtual scrolling helper for large lists
   */
  getVisibleItems: <T>(
    items: T[],
    containerHeight: number,
    itemHeight: number,
    scrollTop: number,
    buffer = 5
  ) => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight)
    );

    const bufferedStart = Math.max(0, startIndex - buffer);
    const bufferedEnd = Math.min(items.length - 1, endIndex + buffer);

    return {
      items: items.slice(bufferedStart, bufferedEnd + 1),
      startIndex: bufferedStart,
      endIndex: bufferedEnd,
      totalHeight: items.length * itemHeight,
      offsetY: bufferedStart * itemHeight,
    };
  },
} as const;
