import React from 'react';
import Square from './Square'

class Board extends React.Component {
    renderSquare(i) {
      const position = this.props.position;
      let classNm = 'square';
      if (position) {
        for (let j = 0; j < position.length; j++) {
          if (i === position[j]) {
            switch (j) {
              case 0 : classNm = 'square-bold-f'; break;
              case 1 : classNm = 'square-bold-s'; break;
              case 2 : classNm = 'square-bold-t'; break;
              default : return;
            }
          }
        }
      }
      
      return (
        <Square
          key={i}
          bold={this.props.position}
          value={this.props.squares[i]}
          classNm={classNm}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const borderRow = [];
      let k = 0;
      for (let i = 0; i < 3; i++) {
          const squares = [];
          for (let j = 0; j < 3; j++) {
              squares.push(this.renderSquare(3 * i + j));
              k++
          }
          borderRow.push(<div key={k} className="board-row">{squares}</div>)
      }
      return (
        <div>
          {borderRow}
        </div>
      );
    }
}

export default Board;