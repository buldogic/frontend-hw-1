const sort = (input: string) => {
  if (typeof input !== 'string') {
    throw new Error('INVALID_ARGUMENT');
  }

  const words = input.split(' ');

  words.sort((a, b) => a.length - b.length);

  const sortedWords = words.map((word) => {
    word = word.toLowerCase();
    const letters = word.split('');
    const sortedLetters = letters.sort((a, b) =>
      a.localeCompare(b, 'en', { sensitivity: 'base' })
    );
    return sortedLetters.join('');
  });

  return sortedWords.join(' ');
};

export default sort;
