import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import './Grid.css';

const numRows = 20;
const numCols = 20;
const maxActiveColumns = 2; 

const App = () => {
  const [grid, setGrid] = useState(createGrid());
  const [colorIndex, setColorIndex] = useState(0);
  const colorIndexRef = useRef(colorIndex);

  const colors = [
    ['#ff00ff', '#e600e6', '#cc00cc', '#b300b3', '#990099'], 
    ['#00ffff', '#00e6e6', '#00cccc', '#00b3b3', '#009999'],
    ['#ffff00', '#e6e600', '#cccc00', '#b3b300', '#999900'],
    ['#ff4500', '#e63e00', '#cc3700', '#b33000', '#992900'], 
    ['#00ff00', '#00e600', '#00cc00', '#00b300', '#009900'] 
  ];

  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setColorIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % colors.length;
        colorIndexRef.current = newIndex; 
        return newIndex;
      });
    }, 3000); 

   
    for (let i = 0; i < maxActiveColumns; i++) {
      startRainfallWithRandomDelay();
    }

    return () => {
      clearInterval(colorChangeInterval);
    };
  }, []);

  const startRainfallWithRandomDelay = () => {
    const randomDelay = Math.random() * 2000; 
    setTimeout(() => {
      createRainfall();
      startRainfallWithRandomDelay(); 
    }, randomDelay);
  };

  const createRainfall = () => {
    const randomColumn = Math.floor(Math.random() * numCols);

    for (let i = 0; i < numRows + 5; i++) {
      setTimeout(() => {
        setGrid(prevGrid => {
          const newGrid = prevGrid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (colIndex === randomColumn) {
                if (rowIndex >= i && rowIndex < i + 5) {
                  return colors[colorIndexRef.current][rowIndex - i];
                } else if (rowIndex === i - 1) {
                  return false;
                }
              }
              return cell;
            })
          );
          return newGrid;
        });
      }, i * 100);
    }
  };

  return (
    <div className="grid">
    <h1>RainFall</h1>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              style={{ backgroundColor: cell ? cell : '' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const createGrid = () => {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(false);
    }
    grid.push(row);
  }
  return grid;
};

export default App;
