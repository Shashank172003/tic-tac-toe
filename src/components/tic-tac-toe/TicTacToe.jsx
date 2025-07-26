import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill("")); // board state
  const [count, setCount] = useState(0); // to track player turn
  const [lock, setLock] = useState(false); // lock board after win or draw
  const titleRef = useRef(null);

  const handleClick = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        declareWinner(board[a]);
        return;
      }
    }

    if (!board.includes("")) {
      titleRef.current.innerHTML = "It's a draw!";
      setLock(true);
    }
  };

  const declareWinner = (winner) => {
    titleRef.current.innerHTML = `Player ${winner.toUpperCase()} wins!`;
    setLock(true);
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "START";
  };

  const renderIcon = (value) => {
    if (value === "x") return <img src={cross_icon} alt="X" />;
    if (value === "o") return <img src={circle_icon} alt="O" />;
    return null;
  };

  return (
    <div className='container'>
      <h1 className='title'>TIC-TAC-TOE Game in <span>React</span></h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={() => handleClick(0)}>{renderIcon(data[0])}</div>
          <div className="boxes" onClick={() => handleClick(1)}>{renderIcon(data[1])}</div>
          <div className="boxes" onClick={() => handleClick(2)}>{renderIcon(data[2])}</div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={() => handleClick(3)}>{renderIcon(data[3])}</div>
          <div className="boxes" onClick={() => handleClick(4)}>{renderIcon(data[4])}</div>
          <div className="boxes" onClick={() => handleClick(5)}>{renderIcon(data[5])}</div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={() => handleClick(6)}>{renderIcon(data[6])}</div>
          <div className="boxes" onClick={() => handleClick(7)}>{renderIcon(data[7])}</div>
          <div className="boxes" onClick={() => handleClick(8)}>{renderIcon(data[8])}</div>
        </div>
      </div>
      <h1 className='result' ref={titleRef}>START</h1>
      <button className='reset' onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
