const removeAnagrams = (arr: unknown) => {
  if (!Array.isArray(arr)) throw new Error('INVALID_ARGUMENT');

  if (arr.some((item) => typeof item !== 'string'))
    throw new Error('INVALID_ELEMENT_IN_ARRAY');

  let map = new Map<string, number>();

  for (let word of arr) {
    let nWord = word.toLowerCase().split('').sort().join('');

    const countRepeats = map.get(nWord) ?? 0;

    map.set(nWord, countRepeats + 1);
  }

  const result = arr.filter((word) => {
    let nWord = word.toLowerCase().split('').sort().join('');

    const countRepeats = map.get(nWord) ?? 0;

    if (countRepeats > 1) {
      return false;
    }
    return true;
  });

  return result;
};

export default removeAnagrams;
