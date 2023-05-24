import React from 'react';
import Modal from 'react-modal';
import './resultModal.css';

const ResultModal = (props) => {
  const { isOpen, winner, onClose, onReset } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="result-modal">
      <div className="result-modal-content">
        <h2 className="result-modal-title">Game Over</h2>
        <p className="result-modal-message">
          {winner === 'draw'
            ? "It's a Draw!"
            : `Player ${winner?.charAt(0)?.toUpperCase() + winner?.slice(1)} wins!`}
        </p>
        <div className="result-modal-buttons">
          <button className="result-modal-button" onClick={onReset}>
            Reset
          </button>
          <button className="result-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
