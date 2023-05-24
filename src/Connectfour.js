import React, { useState, useEffect  } from 'react';
import './App.css';
import ResultModal from './components/resultModal';

// Define the dimensions of the board
const numRows = 6;
const numCols = 7;

const initialBoard = () => (
  Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(null))
);
const ConnectFour = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [winner, setWinner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColumnClick = (colIndex) => {
    if (winner || isColumnFull(colIndex)) {
      return;
    }

    const updatedBoard = [...board];
    for (let row = numRows - 1; row >= 0; row--) {
      if (!updatedBoard[row][colIndex]) {
        updatedBoard[row][colIndex] = currentPlayer;
        break;
      }
    }

    setBoard(updatedBoard);
    checkWinner(updatedBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 'red' ? 'yellow' : 'red');
  };

  const isColumnFull = (colIndex) => {
    return board[0][colIndex] !== null;
  };

  const checkWinner = (board, player) => {
    // Check horizontal lines
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
        if (
          board[row][col] === player &&
          board[row][col + 1] === player &&
          board[row][col + 2] === player &&
          board[row][col + 3] === player
        ) {
          setWinner(player);
          return;
        }
      }
    }

    // Check vertical lines
    for (let row = 0; row <= numRows - 4; row++) {
      for (let col = 0; col < numCols; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col] === player &&
          board[row + 2][col] === player &&
          board[row + 3][col] === player
        ) {
          setWinner(player);
          return;
        }
      }
    }

    // Check diagonal lines (both directions)
    for (let row = 0; row <= numRows - 4; row++) {
      for (let col = 0; col <= numCols - 4; col++) {
        if (
          board[row][col] === player &&
          board[row + 1][col + 1] === player &&
          board[row + 2][col + 2] === player &&
          board[row + 3][col + 3] === player
        ) {
          setWinner(player);
          return;
        }

        if (
          board[row][col + 3] === player &&
          board[row + 1][col + 2] === player &&
          board[row + 2][col + 1] === player &&
          board[row + 3][col] === player
        ) {
          setWinner(player);
          return;
        }
      }
    }

    // Check for a draw
    if (isBoardFull(board)) {
      setWinner('draw');
    }
  };

  const isBoardFull = (board) => {
    return board.every((row) => row.every((cell) => cell !== null));
  };

  const handleReset = () => {
    setBoard(initialBoard());
    setCurrentPlayer('red');
    setWinner(null);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (winner) {
      setIsModalOpen(true);
    }
  }, [winner]);

  const renderCells = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`cell ${cell}`}
            onClick={() => handleColumnClick(colIndex)}
          />
        ))}
      </div>
    ));
  };

  const renderStatus = () => {
    if (winner) {
      if (winner === 'draw') {
        return (
          <div className="status">
            It's a Draw!
          </div>
        );
      }
      return (
        <div className="status">
          Player{' '}
          <span className={winner === 'red' ? 'red' : 'yellow'}>
            {winner.charAt(0).toUpperCase() + winner.slice(1)}
          </span>{' '}
          wins!
        </div>
      );
    } else {
      return (
        <div className="status">
          Current Player:{' '}
          <span className={currentPlayer === 'red' ? 'red' : 'yellow'}>
            {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
          </span>
        </div>
      );
    }
  };
  const renderResetButton = () => {
    return (
      <button className="reset-button" onClick={handleReset}>
        Reset Game Board
      </button>
    );
  };

  return (
    <div className="connect-four">
      <h1>Connect Four Game</h1>
      <div className="board">{renderCells()}</div>
      {renderStatus()}
      {renderResetButton()}

      <ResultModal
        isOpen={isModalOpen}
        winner={winner}
        onClose={handleCloseModal}
        onReset={handleReset}
      />
      <div className="footer">
        Developed by Eric Rogers
      </div>
    </div>
    
  );
};

export default ConnectFour;
