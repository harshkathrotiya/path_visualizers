// src/components/Controls.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({
  selectedAlgorithm,
  onAlgorithmChange,
  speed,
  onSpeedChange,
  isRunning,
  onPlayPause,
  onReset,
  onGenerateNewMaze
}) => {
  const algorithms = [
    { id: 'astar', name: 'A* Algorithm' },
    { id: 'dijkstra', name: 'Dijkstra\'s Algorithm' },
    { id: 'bfs', name: 'Breadth First Search' },
    { id: 'dfs', name: 'Depth First Search' },
    { id: 'greedy', name: 'Greedy Best-First Search' }
  ];

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg border border-cyan-500/30">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <select
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          className="w-full bg-gray-800 text-cyan-400 px-4 py-2 rounded-md border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 hover:bg-gray-700"
        >
          <option value="">Select Algorithm</option>
          {algorithms.map(algo => (
            <option key={algo.id} value={algo.id}>{algo.name}</option>
          ))}
        </select>

        <div className="flex items-center gap-2 w-full">
          <label className="text-purple-400 whitespace-nowrap">Speed:</label>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full accent-cyan-500"
          />
        </div>

        <button
          onClick={onPlayPause}
          className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-500 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-colors"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={onReset}
          className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
        >
          Reset
        </button>

        <button
          onClick={onGenerateNewMaze}
          className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-800 text-cyan-400 hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-colors"
        >
          Generate New Maze
        </button>
      </div>
    </div>
  );
};

Controls.propTypes = {
  selectedAlgorithm: PropTypes.string.isRequired,
  onAlgorithmChange: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onGenerateNewMaze: PropTypes.func.isRequired
};

export default Controls;