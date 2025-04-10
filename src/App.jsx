// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import AlgorithmInfo from './components/AlgorithmInfo';
import { algorithms } from './utils/algorithms';

function App() {
  const GRID_ROWS = 20;
  const GRID_COLS = 30;

  const [grid, setGrid] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [startNode, setStartNode] = useState({ row: 0, col: 0 });
  const [endNode, setEndNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [pathNodes, setPathNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [stats, setStats] = useState({
    visitedCount: 0,
    pathLength: 0,
    timeElapsed: 0
  });

  const initializeGrid = useCallback(() => {
    let grid = [];

    for (let i = 0; i < GRID_ROWS; i++) {
      let row = [];
      for (let j = 0; j < GRID_COLS; j++) {
        row.push(0);
      }
      grid.push(row);
    }

    // Add some walls randomly
    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        if (i === 0 && j === 0) continue; // Skip start
        if (Math.random() < 0.3) {
          grid[i][j] = 1;
        }
      }
    }

    setGrid(grid);
    setEndNode(null);
    setVisitedNodes([]);
    setPathNodes([]);
    setCurrentNode(null);
    setStats({
      visitedCount: 0,
      pathLength: 0,
      timeElapsed: 0
    });
  }, []);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  // Track drawing mode (end, wall, erase)
  const [drawMode, setDrawMode] = useState('end');

  const handleCellClick = (row, col) => {
    if (isRunning) return;

    setVisitedNodes([]);
    setPathNodes([]);
    setCurrentNode(null);

    if (drawMode === 'start') {
      if (grid[row][col] === 1) return;
      if (endNode && row === endNode.row && col === endNode.col) return;
      setStartNode({ row, col });
    }
    else if (drawMode === 'end') {
      if (row === startNode.row && col === startNode.col) return;
      if (grid[row][col] === 1) return;
      setEndNode({ row, col });
    }
    else if (drawMode === 'wall') {
      if (row === startNode.row && col === startNode.col) return;
      if (endNode && row === endNode.row && col === endNode.col) return;

      let newGrid = [...grid];
      newGrid[row][col] = 1;
      setGrid(newGrid);
    }
    else if (drawMode === 'erase') {
      if (row === startNode.row && col === startNode.col) return;
      if (endNode && row === endNode.row && col === endNode.col) return;

      let newGrid = [...grid];
      newGrid[row][col] = 0;
      setGrid(newGrid);
    }
  };

  async function runPathfinding() {
    if (!selectedAlgorithm || !endNode) return;

    setIsRunning(true);
    let startTime = performance.now();
    let algo = algorithms[selectedAlgorithm];
    let gen = algo(grid, startNode, endNode);

    while (true) {
      let next = await gen.next();

      if (next.done) {
        let path = next.value.path;
        let visited = next.value.visited;

        setVisitedNodes(visited);
        setPathNodes(path);
        setCurrentNode(null);

        setStats({
          visitedCount: visited.length,
          pathLength: path.length,
          timeElapsed: Math.round(performance.now() - startTime)
        });

        setIsRunning(false);
        break;
      }

      setCurrentNode(next.value.current);
      setVisitedNodes(next.value.visited);
      setPathNodes(next.value.path);

      await new Promise(r => setTimeout(r, Math.max(1, 101 - speed)));
    }
  }

  function handleReset() {
    setVisitedNodes([]);
    setPathNodes([]);
    setCurrentNode(null);
    setIsRunning(false);
    setStats({
      visitedCount: 0,
      pathLength: 0,
      timeElapsed: 0
    });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Path Visualizers
        </h1>
        <p className="text-center text-gray-300 mb-6">Interactive Pathfinding Algorithm Visualization Tool</p>

        {/* Add a simple drawing mode selector */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setDrawMode('start')}
            className={`px-3 py-1 rounded ${drawMode === 'start' ? 'bg-purple-600' : 'bg-gray-700'}`}
          >
            Place Start
          </button>
          <button
            onClick={() => setDrawMode('end')}
            className={`px-3 py-1 rounded ${drawMode === 'end' ? 'bg-cyan-500' : 'bg-gray-700'}`}
          >
            Place End
          </button>
          <button
            onClick={() => setDrawMode('wall')}
            className={`px-3 py-1 rounded ${drawMode === 'wall' ? 'bg-gray-800' : 'bg-gray-700'}`}
          >
            Draw Walls
          </button>
          <button
            onClick={() => setDrawMode('erase')}
            className={`px-3 py-1 rounded ${drawMode === 'erase' ? 'bg-gray-900' : 'bg-gray-700'}`}
          >
            Erase
          </button>
        </div>

        {/* Simple status display */}
        <div className="mb-4 p-2 bg-gray-800 rounded text-sm">
          <div>Mode: {drawMode === 'start' ? 'Placing Start' : drawMode === 'end' ? 'Placing End' : drawMode === 'wall' ? 'Drawing Walls' : 'Erasing'}</div>
          <div>Start: [{startNode.row}, {startNode.col}]</div>
          <div>End: {endNode ? `[${endNode.row}, ${endNode.col}]` : 'Not set'}</div>
        </div>

        <Controls
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
          speed={speed}
          onSpeedChange={setSpeed}
          isRunning={isRunning}
          onPlayPause={isRunning ? handleReset : runPathfinding}
          onReset={handleReset}
          onGenerateNewMaze={initializeGrid}
        />

        <div className="flex gap-6">
          <div className="flex-1">
            <Grid
              grid={grid}
              startNode={startNode}
              endNode={endNode}
              visitedNodes={visitedNodes}
              pathNodes={pathNodes}
              currentNode={currentNode}
              onCellClick={handleCellClick}
              drawMode={drawMode}
            />
          </div>

          <div className="w-96">
            <AlgorithmInfo
              algorithm={selectedAlgorithm}
              visitedCount={stats.visitedCount}
              pathLength={stats.pathLength}
              timeElapsed={stats.timeElapsed}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-4 text-center text-gray-400">
        <p className="flex items-center justify-center gap-1 mb-2">
          Made with <span className="text-red-500 animate-pulse">💖</span> by <a href="https://www.linkedin.com/in/harsh-kathrotiya" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">Harsh Kathrotiya</a>
        </p>
        <p className="text-sm">
          <a href="https://pathvisualizers.vercel.app/" className="text-gray-500 hover:text-gray-300 transition-colors">pathvisualizers.vercel.app</a> |
          <a href="https://github.com/harshkathrotiya/path-visualizers" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors ml-2">GitHub</a>
        </p>
      </footer>
    </div>
  );
}

export default App;