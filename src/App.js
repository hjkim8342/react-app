import React, { Component } from 'react';
import TOC     from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"
import Subject2 from "./components/Subject2"
import './App.css';


class App extends Component {

  // 제일 먼저 실행되서 초기화 담당
  constructor(props){
    super(props);
    this.state = {
      mode : "welcome",
      selected_content_id : 2,
      subject:{title:'WEB', sub:'World Wide Web!!'},
      welcome:{title :'welcome' , desc : 'Hello, React!!'},
      contents:[
        {id:1 , title:'HTML', desc:'HTML is for information'},
        {id:2 , title:'CSS', desc:'CSS is for design'},
        {id:3 , title:'Javascript', desc:'Javascript is for interactive'}
      ],
      test : 'test1'
    }
  }

  getReadContent(){
    var i = 0 ;

      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        
        if(data.id === this.state.selected_content_id){
          break;
        }
        
        i = i + 1;
      }

      return data;
  }

  getContent(){
    var _title, _desc , _article= null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    
    } else if(this.state.mode === 'read'){
      
      var _content = this.getReadContent();      
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;

    } else if(this.state.mode === 'create'){
    
      _article = <CreateContent onSubmit={function(_title, _desc){
        
        var newContents = this.state.contents.concat({
          id : this.state.contents.length + 1,
          title: _title ,
          desc: _desc

        });
        
        this.setState({
          contents : newContents,
          mode : 'read'
        })

      }.bind(this)}></CreateContent>;
    } else if(this.state.mode === 'update'){
      
      _content = this.getReadContent();

      _article = <UpdateContent data={_content} onSubmit={function(_id,_title, _desc){
        var newContents = Array.from(this.state.contents);
        
        for(var i=0; i < newContents.length; i++){
          if(newContents[i].id === _id){
            
            newContents[i] = {id : _id , title : _title, desc : _desc}
            break;
          }
        }
        
        this.setState({
          contents : newContents,
          mode : 'read'
        })
      }.bind(this)}></UpdateContent>;
    }

    return _article;
  }

  render(){
    
    return (
      <div className="App">
          <Subject 
            title={this.state.subject.title} 
            sub={this.state.subject.sub} 
            onChangePage={function(){
              this.setState({
                mode:'welcome'
              })
            }.bind(this)}
          >
          </Subject>

          <Subject2
            title={this.state.subject.title} 
            sub={this.state.subject.sub} 
            onClick={function(){
              console.log(this.state.test)
              
            }.bind(this)}
          >
          </Subject2>

          {/* <Subject title="React" sub="For UI"></Subject>
          <Subject></Subject> */}
          
          <TOC 
            onChangePage={function(id){
              this.setState({
                mode:'read',
                selected_content_id :  Number(id)
            })
          }.bind(this)} data={this.state.contents}
          >
          </TOC>

          <Control onChangeMode={function(_mode){

            if(_mode === 'delete'){
              if(window.confirm('삭제??')){
                var _content = Array.from(this.state.contents)
                var i =0;
                while(i < _content.length){
                  if(_content[i].id === this.state.selected_content_id){
                    _content.splice(i,1)
                    break;
                  }

                  i++;
                }
              }
        
              this.setState({
                mode : 'welcome',
                contents : _content
              })
            }else{
              this.setState({
                mode : _mode
              })
            }
            
          }.bind(this)}></Control>
          
          {this.getContent()}
          
          {/* <Content title="React" desc="React is Easy"></Content> */}
      
      </div>
    );
  };
};


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
