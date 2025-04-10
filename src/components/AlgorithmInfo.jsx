// src/components/AlgorithmInfo.jsx
import React from 'react';
import PropTypes from 'prop-types';

const AlgorithmInfo = ({ algorithm, visitedCount, pathLength, timeElapsed }) => {
  const algorithmDescriptions = {
    astar: {
      name: 'A* Algorithm',
      description: 'A* combines Dijkstra\'s systematic approach with intelligent heuristic estimation, making it one of the most efficient pathfinding algorithms. It evaluates paths using f(n) = g(n) + h(n), where g(n) is the actual cost from start to current node, and h(n) is the estimated cost to goal. This "smart" approach allows A* to focus on the most promising paths first, typically finding the optimal solution faster than other algorithms. Best used when you need guaranteed shortest paths with better performance than Dijkstra\'s algorithm.',
      complexity: 'Time Complexity: O(|E| log |V|) - |V| vertices, |E| edges',
    },
    dijkstra: {
      name: 'Dijkstra\'s Algorithm',
      description: 'Dijkstra\'s algorithm systematically explores the graph by always choosing the unvisited node with the smallest distance from the start. It maintains a set of tentative distances and updates them as shorter paths are found. The algorithm expands outward in a circular pattern, guaranteeing the shortest path in weighted graphs. Unlike A*, it doesn\'t use heuristics, making it more thorough but potentially slower. Ideal for scenarios where you need the absolutely shortest path and have no additional information about the goal\'s location.',
      complexity: 'Time Complexity: O(|E| log |V|) - |V| vertices, |E| edges',
    },
    bfs: {
      name: 'Breadth First Search',
      description: 'BFS explores the graph layer by layer, visiting all nodes at the current depth before moving deeper. It uses a queue data structure to track nodes to visit, ensuring that closer nodes are always explored before farther ones. This systematic approach guarantees finding the shortest path in unweighted graphs (where each step has equal cost). BFS creates a "wavefront" that expands uniformly in all directions, making it particularly effective for maze-like environments where the path might require many turns. Best for finding shortest paths in terms of number of steps.',
      complexity: 'Time Complexity: O(|V| + |E|) - Linear time search',
    },
    dfs: {
      name: 'Depth First Search',
      description: 'DFS aggressively explores deeper into the graph by following a single path as far as possible before backtracking. It uses a stack data structure (or recursion) to track its path, consuming minimal memory compared to BFS. While DFS can find a path quickly in some cases, it may not find the shortest path. The algorithm is particularly effective in maze generation and solving puzzles where the path length is not critical. Its depth-first nature makes it good at finding paths in sparse graphs or when memory is limited.',
      complexity: 'Time Complexity: O(|V| + |E|) - Linear time search',
    },
    greedy: {
      name: 'Greedy Best-First Search',
      description: 'Greedy Best-First Search makes locally optimal choices based purely on heuristic estimates to the goal, without considering the cost of the path so far. It always expands the node that appears closest to the goal, making it very fast but potentially inaccurate. Unlike A*, it ignores the actual path cost (g(n)), using only the heuristic estimate (h(n)). This makes it much faster than A* or Dijkstra but at the cost of path optimality. Best used when finding a quick path is more important than finding the shortest path, such as in real-time applications with time constraints.',
      complexity: 'Time Complexity: O(|E| log |V|) - Often faster in practice due to heuristic focus',
    },
  };

  const currentAlgo = algorithmDescriptions[algorithm] || {
    name: 'Select an Algorithm',
    description: 'Choose an algorithm from the controls above to begin pathfinding.',
    complexity: '-',
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg border border-purple-500/30">
      <h2 className="text-2xl font-bold mb-3 text-cyan-400 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        {currentAlgo.name}
      </h2>
      <div className="prose prose-invert max-w-none mb-6">
        <p className="text-purple-300 text-base leading-relaxed whitespace-pre-line">
          {currentAlgo.description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm border-t border-purple-500/20 pt-4">
        <div className="bg-gray-800 p-3 rounded-lg border border-cyan-500/20">
          <span className="text-cyan-400">Complexity:</span>
          <span className="text-purple-300 ml-2">{currentAlgo.complexity}</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg border border-cyan-500/20">
          <span className="text-cyan-400">Nodes Visited:</span>
          <span className="text-purple-300 ml-2">{visitedCount}</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg border border-cyan-500/20">
          <span className="text-cyan-400">Path Length:</span>
          <span className="text-purple-300 ml-2">{pathLength}</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg border border-cyan-500/20">
          <span className="text-cyan-400">Time:</span>
          <span className="text-purple-300 ml-2">{timeElapsed}ms</span>
        </div>
      </div>
    </div>
  );
};

AlgorithmInfo.propTypes = {
  algorithm: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  pathLength: PropTypes.number.isRequired,
  timeElapsed: PropTypes.number.isRequired
};

export default AlgorithmInfo;