import React from 'react';

class Square extends React.Component {
  render () {
    return (
      <button className={this.props.classNm} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;