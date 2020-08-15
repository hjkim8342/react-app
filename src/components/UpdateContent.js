import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
    //해당 하는 this 바인드 시키기 매번 코드 bind 안 시켜도 됨
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  // [e.target.name] 해당 하는 엘리먼트 이름 가져옴 
  inputFormHandler(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render () {
    return (
      <article>
        <h2>Update</h2>
        <form action="/create_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
          }.bind(this)}
        >
          <p>
            <input type="hidden" name="id" value={this.state.id}></input>
            <input
              type="text" 
              name="title" 
              placeholder="title"
              value={this.state.title}
              onChange={this.inputFormHandler}
            ></input></p>
          <p><textarea 
                name="desc" 
                placeholder="description" 
                value={this.state.desc}
                onChange={this.inputFormHandler}
              ></textarea></p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;