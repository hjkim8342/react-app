import React, { Component } from 'react';

class Toc extends Component {
    // Reactjs 에서 제공하는 shouldComponentUpdate(newProps, newState) 매개변수를 가지고 있음 return false할 시에는 해당 컴퍼넌트 render() 함수 실행 안함
    shouldComponentUpdate(newProps, newState){
        console.log('===>Toc render shouldComponentUpdate'
            ,newProps.data
            ,this.props.data
        );
        
        if(this.props.data === newProps.data) return false;
        else return true;
    }
    
    
    render () {
        console.log('===>Toc render');
        var list = [];
        var data = this.props.data;
        for(var i = 0; i < data.length; i++){
            list.push(
                <li key={data[i].id}>
                    <a 
                        href={"/content/"+data[i].id}
                        data-id={data[i].id}
                        onClick={function(id, e){
                            //console.log(e.target.dataset.id);
                            e.preventDefault();
                            this.props.onChangePage(id);
                            //this.props.onChangePage(e.target.dataset.id);
                        //바인드 시 매개변수를 지정할 시 아래와 예시로 말하면 function(data[i].id, e) 이 순으로 넘어감
                        }.bind(this, data[i].id)}
                    >{data[i].title}</a>
                </li>);
        }
        return (
            <nav>
                <ul>
                    {list}
                </ul>
            </nav>
        );
    }
}

export default Toc;