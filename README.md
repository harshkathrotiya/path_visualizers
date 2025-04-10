# 🔍 Pathfinding Visualizer

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-4-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-cyan)
![Author](https://img.shields.io/badge/Author-Harsh%20Kathrotiya-orange)
![License](https://img.shields.io/badge/License-MIT-green)

An interactive web application that visualizes various pathfinding algorithms. Watch how different algorithms navigate through a maze to find the shortest path from start to end!

Developed by Harsh Kathrotiya, this project demonstrates the inner workings of popular pathfinding algorithms through an intuitive and visually appealing interface.

<!-- Add a screenshot or GIF of your application here -->
<p align="center">
  <i>Visualize pathfinding algorithms in action</i>
</p>

## ✨ Features

- **Multiple Algorithms**: Visualize A*, Dijkstra's, BFS, DFS, and Greedy Best-First Search
- **Interactive Grid**: Create your own mazes by placing walls and obstacles
- **Customizable Start/End Points**: Place start and end points anywhere on the grid
- **Real-time Visualization**: Watch the algorithm search for the path step by step
- **Performance Stats**: See how many nodes were visited and the path length

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/harshkathrotiya/pathfinding-visualizer.git

# Navigate to the project directory
cd pathfinding-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

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

| Algorithm | Description | Time Complexity | Space Complexity |
|-----------|-------------|-----------------|------------------|
| A* | Uses heuristics to find the shortest path efficiently | O(E log V) | O(V) |
| Dijkstra's | Guarantees the shortest path | O(E log V) | O(V) |
| BFS | Explores all neighbors at the present depth before moving to nodes at the next depth | O(V + E) | O(V) |
| DFS | Explores as far as possible along each branch before backtracking | O(V + E) | O(V) |
| Greedy Best-First | Always moves in the direction of the goal | O(E log V) | O(V) |

## 🛠️ Tech Stack

- **React**: UI library for building the interface
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for styling
- **JavaScript**: Programming language

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

Feel free to reach out if you have any questions or suggestions about this project!
