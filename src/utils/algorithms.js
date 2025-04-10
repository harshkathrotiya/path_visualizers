// src/utils/algorithms.js
class Node {
  constructor(row, col, g = 0, h = 0) {
    this.row = row;
    this.col = col;
    this.g = g; // Cost from start to current node
    this.h = h; // Heuristic (estimated cost from current node to end)
    this.f = g + h; // Total cost
    this.parent = null;
  }
}

const heuristic = (node, goal) => {
  return Math.abs(node.row - goal.row) + Math.abs(node.col - goal.col);
};

const getNeighbors = (node, grid) => {
  const neighbors = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (const [dx, dy] of directions) {
    const newRow = node.row + dx;
    const newCol = node.col + dy;

    if (newRow >= 0 && newRow < grid.length &&
        newCol >= 0 && newCol < grid[0].length &&
        grid[newRow][newCol] !== 1) {
      neighbors.push(new Node(newRow, newCol));
    }
  }

  return neighbors;
};

export const algorithms = {
  astar: async function* (grid, start, end) {
    const openSet = [new Node(start.row, start.col)];
    const closedSet = new Set();
    const visited = [];

    while (openSet.length > 0) {
      const current = openSet.reduce((min, node) =>
        node.f < min.f ? node : min, openSet[0]);

      if (current.row === end.row && current.col === end.col) {
        const path = [];
        let temp = current;
        while (temp.parent) {
          path.unshift(temp);
          temp = temp.parent;
        }
        return { path, visited };
      }

      openSet.splice(openSet.indexOf(current), 1);
      closedSet.add(`${current.row},${current.col}`);
      visited.push(current);

      yield { current, visited, path: [] };

      for (const neighbor of getNeighbors(current, grid)) {
        if (closedSet.has(`${neighbor.row},${neighbor.col}`)) continue;

        const tentativeG = current.g + 1;

        const existingNode = openSet.find(
          node => node.row === neighbor.row && node.col === neighbor.col
        );

        if (!existingNode || tentativeG < existingNode.g) {
          neighbor.g = tentativeG;
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;

          if (!existingNode) {
            openSet.push(neighbor);
          }
        }
      }
    }

    return { path: [], visited };
  },

  dijkstra: async function* (grid, start, end) {
    const nodes = [];
    const visited = [];
    const distances = {};
    const previous = {};

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const id = `${row},${col}`;
        distances[id] = Infinity;
        nodes.push({ row, col });
      }
    }

    distances[`${start.row},${start.col}`] = 0;

    while (nodes.length > 0) {
      const current = nodes.reduce((min, node) => {
        const id = `${node.row},${node.col}`;
        return distances[id] < distances[`${min.row},${min.col}`] ? node : min;
      }, nodes[0]);

      if (current.row === end.row && current.col === end.col) {
        const path = [];
        let temp = end;
        while (temp) {
          path.unshift(temp);
          temp = previous[`${temp.row},${temp.col}`];
        }
        return { path, visited };
      }

      nodes.splice(nodes.findIndex(n =>
        n.row === current.row && n.col === current.col), 1);
      visited.push(current);

      yield { current, visited, path: [] };

      const neighbors = getNeighbors(current, grid);
      for (const neighbor of neighbors) {
        const alt = distances[`${current.row},${current.col}`] + 1;
        const neighborId = `${neighbor.row},${neighbor.col}`;

        if (alt < distances[neighborId]) {
          distances[neighborId] = alt;
          previous[neighborId] = current;
        }
      }
    }

    return { path: [], visited };
  },

  bfs: async function* (grid, start, end) {
    const queue = [new Node(start.row, start.col)];
    const visited = new Set([`${start.row},${start.col}`]);
    const visitedNodes = [];
    const previous = new Map();

    while (queue.length > 0) {
      const current = queue.shift();
      visitedNodes.push(current);

      if (current.row === end.row && current.col === end.col) {
        const path = [];
        let temp = current;
        while (previous.has(`${temp.row},${temp.col}`)) {
          path.unshift(temp);
          temp = previous.get(`${temp.row},${temp.col}`);
        }
        return { path, visited: visitedNodes };
      }

      yield { current, visited: visitedNodes, path: [] };

      for (const neighbor of getNeighbors(current, grid)) {
        const key = `${neighbor.row},${neighbor.col}`;
        if (!visited.has(key)) {
          visited.add(key);
          previous.set(key, current);
          queue.push(neighbor);
        }
      }
    }

    return { path: [], visited: visitedNodes };
  },

  dfs: async function* (grid, start, end) {
    const stack = [new Node(start.row, start.col)];
    const visited = new Set([`${start.row},${start.col}`]);
    const visitedNodes = [];
    const previous = new Map();

    while (stack.length > 0) {
      const current = stack.pop();
      visitedNodes.push(current);

      if (current.row === end.row && current.col === end.col) {
        const path = [];
        let temp = current;
        while (previous.has(`${temp.row},${temp.col}`)) {
          path.unshift(temp);
          temp = previous.get(`${temp.row},${temp.col}`);
        }
        return { path, visited: visitedNodes };
      }

      yield { current, visited: visitedNodes, path: [] };

      for (const neighbor of getNeighbors(current, grid)) {
        const key = `${neighbor.row},${neighbor.col}`;
        if (!visited.has(key)) {
          visited.add(key);
          previous.set(key, current);
          stack.push(neighbor);
        }
      }
    }

    return { path: [], visited: visitedNodes };
  },

  greedy: async function* (grid, start, end) {
    const openSet = [new Node(start.row, start.col, 0, heuristic({ row: start.row, col: start.col }, end))];
    const visited = new Set([`${start.row},${start.col}`]);
    const visitedNodes = [];
    const previous = new Map();

    while (openSet.length > 0) {
      openSet.sort((a, b) => b.h - a.h);
      const current = openSet.pop();
      visitedNodes.push(current);

      if (current.row === end.row && current.col === end.col) {
        const path = [];
        let temp = current;
        while (previous.has(`${temp.row},${temp.col}`)) {
          path.unshift(temp);
          temp = previous.get(`${temp.row},${temp.col}`);
        }
        return { path, visited: visitedNodes };
      }

      yield { current, visited: visitedNodes, path: [] };

      for (const neighbor of getNeighbors(current, grid)) {
        const key = `${neighbor.row},${neighbor.col}`;
        if (!visited.has(key)) {
          visited.add(key);
          previous.set(key, current);
          neighbor.h = heuristic(neighbor, end);
          openSet.push(neighbor);
        }
      }
    }

    return { path: [], visited: visitedNodes };
  }
};