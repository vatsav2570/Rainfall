import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 40px);
  grid-template-rows: repeat(20, 40px);
  gap: 2px;
  width: fit-content;
  margin: auto;
  margin-top: 50px;
  background-color: #111;
  padding: 10px;
  border-radius: 10px;
`;

const DropAnimation = keyframes`
  0% { opacity: 0; transform: translateY(-40px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(800px); }
  100% { opacity: 0; transform: translateY(840px); }
`;

const Drop = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  animation: ${DropAnimation} 2s linear infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const generateDrops = (rows, cols) => {
  const drops = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      drops.push({
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        delay: Math.random() * 2,
      });
    }
  }
  return drops;
};

const RainfallGrid = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    setDrops(generateDrops(20, 15));
  }, []);

  return (
    <GridContainer>
      {drops.map((drop, index) => (
        <Drop key={index} color={drop.color} delay={drop.delay} />
      ))}
    </GridContainer>
  );
};

export default RainfallGrid;
