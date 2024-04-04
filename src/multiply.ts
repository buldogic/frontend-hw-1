const multiply = (a: unknown) => {
  if (typeof a !== 'number') throw new Error('INVALID_ARGUMENT');

  return (b: unknown) => {
    if (typeof b !== 'number') throw new Error('INVALID_ARGUMENT');
    return a * b;
  };
};

export default multiply;
