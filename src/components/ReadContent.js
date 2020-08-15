import React, { Component } from 'react';

//해당 컴퍼넌트 안에서 props 변경 불가 
class ReadContent extends Component {
  render () {
    console.log('Content render');
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

export default ReadContent;