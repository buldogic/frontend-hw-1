// Object.defineProperty(global, 'performance', {
//   writable: true,
// });

const memo = <T extends (...args: any[]) => any>(
  func: T,
  time: number = Infinity
): ((...arg: Parameters<T>) => ReturnType<T>) => {
  if (typeof func !== 'function') {
    throw new Error('INVALID_ARGUMENT');
  }
  if (time !== undefined && (typeof time !== 'number' || time < 0)) {
    throw new Error('INVALID_ARGUMENT');
  }

  const argKey = (x) => JSON.stringify(x) ?? '';
  const generateKey = (args) => args.map(argKey).join('|');

  const cache = Object.create(null);
  const lastCalls: Record<string, number | null> = {};

  return function (...args: Parameters<T>) {
    const key = generateKey(args);
    const lastCall = lastCalls[key];
    const isExpired = lastCall === null || Date.now() - lastCall > time;
    const hasCache = key in cache;

    if (isExpired || !hasCache) {
      const result = func(...args);
      cache[key] = result;
      lastCalls[key] = Date.now();
    }

    return cache[key];
  };
};

export default memo;
