<div align="center">

# 🔍 Path Visualizers

### Interactive Pathfinding Algorithm Visualization Tool

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)](https://tailwindcss.com/)
[![MUI](https://img.shields.io/badge/MUI-6-blue)](https://mui.com/)
[![Author](https://img.shields.io/badge/Author-Harsh%20Kathrotiya-orange)](https://github.com/harshkathrotiya)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)
[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://pathvisualizers.vercel.app/)

[**View Live Demo →**](https://pathvisualizers.vercel.app/)

<p align="center">
  <img src="https://via.placeholder.com/800x400?text=Path+Visualizers+Screenshot" alt="Path Visualizers Screenshot" width="800px" />
</p>

An interactive web application that visualizes various pathfinding algorithms in real-time. Watch how different algorithms navigate through a maze to find the shortest path from start to end!

</div>

## ✨ Features

- **Multiple Algorithms**: Visualize A*, Dijkstra's, BFS, DFS, and Greedy Best-First Search
- **Interactive Grid**: Create your own mazes by placing walls and obstacles
- **Customizable Start/End Points**: Place start and end points anywhere on the grid
- **Real-time Visualization**: Watch the algorithm search for the path step by step
- **Performance Stats**: See how many nodes were visited, path length, and execution time
- **Adjustable Speed**: Control the visualization speed to understand the algorithm better
- **Responsive Design**: Works on desktop and mobile devices
- **Educational Tool**: Perfect for learning about pathfinding algorithms

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/harshkathrotiya/path-visualizers.git

# Navigate to the project directory
cd path-visualizers

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### 🌐 Live Demo

Visit [https://pathvisualizers.vercel.app/](https://pathvisualizers.vercel.app/) to see the application in action without installing anything!

## 🎮 How to Use

1. **Select a Drawing Mode**:
   - Use the buttons at the top to select what to place on the grid
   - Place Start: Set the starting point (purple)
   - Place End: Set the destination point (cyan)
   - Draw Walls: Create obstacles
   - Erase: Remove walls

2. **Choose an Algorithm**:
   - Select one of the available algorithms from the dropdown

3. **Start Visualization**:
   - Click the "Start" button to begin the visualization
   - Use the speed slider to adjust how fast the algorithm runs
   - Click "Reset" to clear the visualization

## 🧠 Algorithms

| Algorithm | Description | Time Complexity | Space Complexity | Best For |
|-----------|-------------|-----------------|------------------|----------|
| A* | Uses heuristics to find the shortest path efficiently | O(E log V) | O(V) | Finding the shortest path with good performance |
| Dijkstra's | Guarantees the shortest path | O(E log V) | O(V) | Finding the shortest path when all edges have equal weight |
| BFS | Explores all neighbors at the present depth before moving to nodes at the next depth | O(V + E) | O(V) | Finding the shortest path in unweighted graphs |
| DFS | Explores as far as possible along each branch before backtracking | O(V + E) | O(V) | Maze generation and solving |
| Greedy Best-First | Always moves in the direction of the goal | O(E log V) | O(V) | Fast pathfinding when optimality is not required |

## 🛠️ Tech Stack

- **React 18**: Modern UI library for building interactive interfaces
- **Vite 6**: Next-generation frontend build tool with lightning-fast HMR
- **TailwindCSS 3**: Utility-first CSS framework for rapid UI development
- **Material UI 6**: React component library implementing Google's Material Design
- **JavaScript**: Core programming language
- **Supabase**: Backend-as-a-Service for future data persistence features

## 📂 Project Structure

```
├── src/
│   ├── components/         # UI components
│   │   ├── Grid.jsx        # Grid visualization component
│   │   ├── Controls.jsx    # Algorithm and control buttons
│   │   └── AlgorithmInfo.jsx # Algorithm information display
│   ├── utils/
│   │   └── algorithms.js   # Implementation of pathfinding algorithms
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles (Tailwind)
├── public/                # Static assets
└── index.html            # HTML template
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Harsh Kathrotiya**

- GitHub: [github.com/harshkathrotiya](https://github.com/harshkathrotiya)
- LinkedIn: [linkedin.com/in/harsh-kathrotiya](https://www.linkedin.com/in/harsh-kathrotiya)
- Website: [pathvisualizers.vercel.app](https://pathvisualizers.vercel.app/)

Feel free to reach out if you have any questions or suggestions about this project!

## 🌟 Why Path Visualizers?

Path Visualizers was created to help students, developers, and algorithm enthusiasts understand how pathfinding algorithms work in a visual, interactive way. By seeing these algorithms in action, users can gain intuitive insights into their behavior, efficiency, and trade-offs.

This tool is perfect for:
- Computer Science students learning about graph algorithms
- Developers wanting to understand pathfinding for game development
- Algorithm enthusiasts curious about how navigation systems work
- Educators teaching concepts of graph traversal and optimization
