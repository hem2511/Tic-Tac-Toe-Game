import React, { useState } from 'react';
import './App.css';

function calculateWinner(squares) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null; // No winner yet
}

function isDraw(squares) {
  return squares.every(square => square !== null) && !calculateWinner(squares);
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleSquareClick = (squareIndex) => {
    if (squares[squareIndex] || calculateWinner(squares)) {
      // If the square is already filled or there's a winner, do nothing.
      return;
    }

    const newSquares = [...squares];
    newSquares[squareIndex] = currentPlayer;
    setSquares(newSquares);

    // Toggle current player for the next turn
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    // Reset the game board to all empty squares and set the starting player to 'X'
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  const winner = calculateWinner(squares);
  const draw = isDraw(squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (draw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${currentPlayer}`;
  }

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleSquareClick(i)}>
      {squares[i]}
    </button>
  );

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

export default App;
