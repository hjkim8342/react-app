import React, { Component } from 'react';
import Toc from './components/Toc';
import Content from './components/Content';
import Subject from './components/Subject';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "welcome",
      welcome: {title:"Welcome", desc:"Hello, React!!"},
      subject: {
        title: "WEB",
        sub: "World Wide Web!",
      },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for Information" },
        { id: 2, title: "CSS", desc: "HTML is for Design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for Interactive" },
      ],
    }
  }

  render() {
    var _title, _desc = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === "read") {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>
        <Toc data={this.state.contents}></Toc>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}
export default App;