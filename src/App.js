import React, { Component } from 'react';
import Toc from './components/Toc';
import Content from './components/Content';
import Subject from './components/Subject';
import './App.css';

//class 하나의 최상의 태그만 작성해야 됨
//class에서는 예전 function 선언 안하고 render() 사용 가능
class App extends Component {
  //render() 하기 전에 constructor로 초기화 시킨다.
  //state로 설정한 데이터를 전달할 시에는 props로 전달 한다 data={this.state.contents}
  //참고 Toc.js(자식) 
  //Reactjs는 props 또는 state가 변경 되면 화면이 다시 그려지는 방식이다.
  constructor(props){
    super(props);
    this.state = {
      mode:'read',
      selected_content_id:2,
      subject:{title:'WEB', sub:'world wide web!!!'},
      welcome:{title:'welcome', desc:'Hello, React!!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render () {
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read'){
      for(var i = 0; i < this.state.contents.length; i++){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
      }
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode : 'welcome'
            });
          }.bind(this)}
        >
        </Subject>
        <Toc 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}>
        </Toc>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;