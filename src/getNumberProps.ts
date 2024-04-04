const getNumberProps = (value: unknown) => {
  if (typeof value !== 'object' || value === null || Array.isArray(value))
    throw new Error('INVALID_ARGUMENT');

  let result: string[] = [];

  for (const key in value) {
    const subValue = value[key];
    if (typeof subValue === 'number') {
      result.push(key);
    }

    if (typeof subValue === 'object' && subValue !== null) {
      const keys = getNumberProps(subValue);
      result = [...result, ...keys];
    }
  }

  return result.sort();
};

export default getNumberProps;
