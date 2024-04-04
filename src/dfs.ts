type Graph = Record<string, string[]>;

const addChildNodes = (node: string, graph: Graph): string[] => {
  const childNodes = graph[node];

  if (childNodes === undefined) throw new Error('INVALID_GRAPH');

  return [node, ...childNodes.map((node) => addChildNodes(node, graph)).flat()];
};

const dfs = (graph: unknown) => {
  if (typeof graph !== 'object' || graph === null || Array.isArray(graph))
    throw new Error('INVALID_ARGUMENT');

  const rootNode = Object.keys(graph)[0] as string | undefined;
  if (rootNode === undefined) throw new Error('INVALID_GRAPH');

  return addChildNodes(rootNode, graph as Graph);
};

export default dfs;
