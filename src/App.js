import React, { Component } from 'react';
import TOC     from "./components/TOC"
import Content from "./components/Content"
import Subject from "./components/Subject"
import Subject2 from "./components/Subject2"
import './App.css';


class App extends Component {

  // 제일 먼저 실행되서 초기화 담당
  constructor(props){
    super(props);
    this.state = {
      mode : "read",
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

  render(){
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc
    }else if(this.state.mode === 'read'){
      
      var i = 0 ;

      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        
        i = i + 1;
      }      
    }
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
          
          <Content title={_title} desc={_desc}></Content>
          
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
