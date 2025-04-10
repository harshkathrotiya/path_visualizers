// src/components/Grid.jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Grid = ({ 
  grid, 
  onCellClick, 
  visitedNodes, 
  pathNodes, 
  currentNode, 
  startNode,
  endNode 
}) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cells = document.querySelectorAll('.grid-cell');
      cells.forEach(cell => {
        const rect = cell.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = Math.floor((x / rect.width) * 100);
        const py = Math.floor((y / rect.height) * 100);
        cell.style.setProperty('--px', `${px}%`);
        cell.style.setProperty('--py', `${py}%`);
      });
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('mousemove', handleMouseMove);
      return () => gridElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getCellClassName = (row, col) => {
    let className = 'grid-cell w-6 h-6 border border-cyan-900/30 relative transition-all duration-200 ';
    
    if (startNode.row === row && startNode.col === col) {
      className += 'bg-purple-600 shadow-lg shadow-purple-500/50 animate-pulse';
    } else if (endNode && endNode.row === row && endNode.col === col) {
      className += 'bg-cyan-500 shadow-lg shadow-cyan-500/50';
    } else if (grid[row][col] === 1) {
      className += 'bg-gray-800 border-gray-700';
    } else if (currentNode && currentNode.row === row && currentNode.col === col) {
      className += 'bg-pink-500 shadow-lg shadow-pink-500/50';
    } else if (pathNodes.some(node => node.row === row && node.col === col)) {
      className += 'bg-cyan-400 shadow-md shadow-cyan-400/50';
    } else if (visitedNodes.some(node => node.row === row && node.col === col)) {
      className += 'bg-purple-400/40 shadow-sm shadow-purple-400/30';
    } else {
      className += 'bg-gray-900/50 hover:bg-gray-800/50';
    }
    
    return className;
  };

  if (!grid || !grid.length || !grid[0]) return null;

  return (
    <div 
      ref={gridRef}
      className="grid gap-0.5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-2xl"
      style={{ 
        gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, rowIndex) => (
        row.map((_, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            className={getCellClassName(rowIndex, colIndex)}
          >
            <div className="glow absolute inset-0 opacity-0 transition-opacity duration-300 rounded-sm" />
          </div>
        ))
      ))}
    </div>
  );
};

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onCellClick: PropTypes.func.isRequired,
  visitedNodes: PropTypes.arrayOf(PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number
  })).isRequired,
  pathNodes: PropTypes.arrayOf(PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number
  })).isRequired,
  currentNode: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number
  }),
  startNode: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number
  }).isRequired,
  endNode: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number
  })
};

export default Grid;