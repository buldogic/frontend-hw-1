const sum = (...args: number[]) => {
  if (args.length < 2) {
    throw new Error('INVALID_ARGUMENTS_COUNT');
  }

  const sumWithInitial = args.reduce((previous: number, current: number) => {
    if (isNaN(current)) {
      throw new Error('INVALID_ARGUMENT');
    }
    return previous + current;
  }, 0);

  return sumWithInitial;
};

export default sum;
