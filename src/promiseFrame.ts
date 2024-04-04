type FunctionType<T> = () => Promise<T> | T;

// Получить из массива функций перечисление результатов их вызовов
// (в случае возврата промиса учитывается именно результат промиса)
type FunctionResultsUnion<
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>
> = {
  [K in keyof T]: Awaited<ReturnType<T[K]>>;
}[number];

const promiseFrame = async <
  T extends FunctionType<any>[] | Readonly<FunctionType<any>[]>,
  ResultsT = FunctionResultsUnion<T>
>(
  functions: T,
  limit?: number
): Promise<ResultsT[]> => {
  if (!Array.isArray(functions)) {
    throw new Error('INVALID_ARGUMENT');
  }
  if (limit !== undefined && limit <= 0) {
    throw new Error('INVALID_ARGUMENT');
  }
  type Func = () => Promise<unknown> | unknown;
  type Chunk = Func[];


  const givenLimit = limit ?? functions.length;

  const chunks: Chunk[] = [];

  for (let i = 0; i <= functions.length; i += givenLimit) {
    chunks.push(functions.slice(i, i + givenLimit));
  }

  const results: unknown[][] = [];

  for (const chunk of chunks) {
    const chunkResults = await Promise.all(chunk.map((func) =>  func()));
    results.push(chunkResults);
    console.log(results.flat(1));
  }
  console.log(results.flat(1));

  return results.flat(1) as unknown as Promise<ResultsT[]>;
};

export default promiseFrame;
