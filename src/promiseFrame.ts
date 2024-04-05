Object.defineProperty(global, 'performance', {
  writable: true,
});

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

  const givenLimit = limit ?? functions.length;

  const tasks = functions.map((run, i) => ({
    i,
    run,
  }));

  type Task = typeof tasks[number];

  const initialTasks = tasks.slice(0, givenLimit);
  const waitingTasks = tasks.slice(givenLimit).reverse();
  const results = new Array(tasks.length);
  const runningTasks = new Set<number>();

  return new Promise((resolve, reject) => {
    const runTask = (t: Task) => {
      runningTasks.add(t.i);

      const promiseOrNot = t.run();

      const promise =
        promiseOrNot instanceof Promise
          ? promiseOrNot
          : Promise.resolve(promiseOrNot);

      return promise
        .then((result) => {
          results[t.i] = result;
          runningTasks.delete(t.i);

          if (waitingTasks.length) {
            const nextTask = waitingTasks.pop();
            if (nextTask) {
              runTask(nextTask);
            }
          }

          if (!waitingTasks.length && runningTasks.size === 0) {
            resolve(results);
          }
        })
        .catch(reject);
    };

    initialTasks.forEach((t) => runTask(t));
  });
};

export default promiseFrame;
