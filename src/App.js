import React, { Component } from 'react';
import Toc from './components/Toc';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

//class 하나의 최상의 태그만 작성해야 됨
//class에서는 예전 function 선언 안하고 render() 사용 가능
//props는 readonly , setState 변경 가능
//하위 컴퍼넌트에서 상위 컴퍼넌트 변경 시 이벤트를 통해서 변경 가능
//상위 컴퍼넌트에서 하위 컴퍼넌트 props 변경 가능 
//REDUX는 STORE 라는 데이터 저장소로 관리 하여 각 컴퍼넌트 연결 하여 구현 
class App extends Component {
  //render() 하기 전에 constructor로 초기화 시킨다.
  //state로 설정한 데이터를 전달할 시에는 props로 전달 한다 data={this.state.contents}
  //참고 Toc.js(자식) 
  //Reactjs는 props 또는 state가 변경 되면 화면이 다시 그려지는 방식이다.
  constructor(props){
    super(props);
    this.max_contents_id = 3;
    this.state = {
      mode:'welcome',
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

  getReadContent(){
    for(var i = 0; i < this.state.contents.length; i++){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        // 배열을 추가 할때 push, concat을 사용 
        // push 는 기존 배열 원본을 변경
        // concat은 기존 배열 값 그대로 보통 
        // arr = [1,2];
        // var result = arr.concat(3); 으로 할 시 arr 값은 [1,2] result 값은 [1,2,3]
        // concat 사용하는 이유는 shouldComponentUpdate 호출시 push는 원본을 바꾸기 때문에 변경 되지 않아도 render() 함수를 호출하기 때문에 concat을 사용해야 됨 
        this.max_contents_id = this.max_contents_id + 1;
        // push 는 원본을 바꾸기 때문에 사용하지 않음 대신 concat 을 사용
        // 단 push를 사용하고 싶을 때는 Array.from()이라는 API를 사용하여 이용 가능 (복제 기능이긴 하지만 서로 다른 배열임) 3번 참고
        // Object를 복사 할 시에는 Object.assign() 사용 여기서도 서로 다른 객체임 

        // 1.
        // this.state.contents.push(
        //   {id:this.max_contents_id, title:_title, desc:_desc}
        // );
        
        // 2.
        // var _contents = this.state.contents.concat(
        //   {id:this.max_contents_id, title:_title, desc:_desc}
        // );

        // 3. Array.from() 은 배열일 경우에만 가능 
        var newContents = Array.from(this.state.contents); // 복제 
        newContents.push(
          {id:this.max_contents_id, title:_title, desc:_desc}
        );
        this.setState({
          contents:newContents,
          mode:'read',
          selected_content_id:this.max_contents_id
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          console.log(_id, _title, _desc);
          var _contents = Array.from(this.state.contents); 
          for(var i = 0; i < _contents.length; i++){
            if(_contents[i].id === _id){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render () {
    console.log('App render');
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
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents);
              for(var i = 0; i < _contents.length; i++){
                if(_contents[i].id === this.state.selected_content_id){
                  // splice(지울시작대상index, 몇번째까지) 삭제
                  _contents.splice(i, 1); 
                  break;
                }
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
          } else {
            this.setState({
              mode : _mode
            });
          }
          
        }.bind(this)}></Control>
        {/* props 값 변경 가능 */}
        {this.getContent()}
      </div>
    );
  }
}

export default App;