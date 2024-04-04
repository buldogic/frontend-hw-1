const planEvent = (cb: unknown, ms: unknown) => {
  if (typeof cb !== 'function') throw new Error('INVALID_ARGUMENT');
  if (typeof ms !== 'number') throw new Error('INVALID_ARGUMENT');
  if (ms <= 0) return Promise.resolve(cb());

  let promise = new Promise(function (resolve) {
    setTimeout(() => resolve(cb()), ms);
  });
  return promise;
};

export default planEvent;
