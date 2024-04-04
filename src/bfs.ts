type Graph = Record<string, string[]>;

const getNextSlice = (nodes: string[], graph: Graph): string[] => {
  const childNodes = nodes.map((node) => graph[node]).flat();
  if (!childNodes.length) return [];
  return [...childNodes, ...getNextSlice(childNodes, graph)];
};

const bfs = (graph: unknown) => {
  if (typeof graph !== 'object' || graph === null || Array.isArray(graph))
    throw new Error('INVALID_ARGUMENT');

  const rootNode = Object.keys(graph)[0] as string | undefined;
  if (rootNode === undefined) throw new Error('INVALID_GRAPH');

  return [rootNode, ...getNextSlice([rootNode], graph as Graph)];
};

export default bfs;
