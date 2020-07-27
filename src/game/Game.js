import React from 'react';
import Board from './Board'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: {
            row: null,
            col: null,
          },
          index: null,
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isAscending:true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: {
            row: Math.floor(i / 3 + 1),
            col: i % 3 + 1,
          },
          index: i,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleReverseToggle() {
    this.setState({
      isAscending : !this.state.isAscending
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const isAscending = this.state.isAscending;
    
    const positions = [];
    for (let i = 0; i < history.length; i++) {
      if (i > (this.state.stepNumber - 3) && i !== 0) {
        positions.push(history[i].index);
      }
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} | ${step.position.row},${step.position.col}` :
        'Go to game Start';
      return (
        <li value={move+1} key={move}>
          <button onClick={() => this.jumpTo(move)} className={move === this.state.stepNumber?'font-weight-bold':''}>{desc}</button>
        </li>
      );
    });

    if (!isAscending) {
      moves.reverse();
    }

    const reverseButtonDesc = isAscending ? "reverse" : "origin";
    const reverseButton = (
      <button onClick={() => this.handleReverseToggle()}>
        {reverseButtonDesc}
      </button>
    );

    let status;
    let flag = false;
    if (winner) {
      status = "Winner: " + winner;
      flag = true;
    } else {
      if (this.state.stepNumber >= 9) {
        status = "Draw";
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            position={flag?positions:false}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <div>{reverseButton}</div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;