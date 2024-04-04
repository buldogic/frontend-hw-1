const intersection = function (arr1: number[], arr2: number[]): number[] {
  if (arguments.length <= 1) {
    throw new Error(`INVALID_ARGUMENTS_COUNT`);
  }
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error(`INVALID_ARGUMENT`);
  }

  const newArr: number[] = [];

  for (let i = 0; i < arr1.length; i++) {
    if (typeof arr1[i] !== 'number') {
      throw new Error(`INVALID_ELEMENT_IN_ARRAY`);
    }
    for (let j = 0; j < arr2.length; j++) {
      if (typeof arr2[j] !== 'number') {
        throw new Error(`INVALID_ELEMENT_IN_ARRAY`);
      }
      if (arr1[i] === arr2[j] && !newArr.includes(arr1[i])) {
        newArr.push(arr1[i]);
      }
    }
  }

  return newArr;
};
export default intersection;
