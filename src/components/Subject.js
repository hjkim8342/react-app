import React, { Component } from 'react';

class Subject extends Component {
    constructor(props){
        super(props);
        this.state = {
            test:'test1'
        }
    }  

    render () {
        console.log('Subject render');
        return (
            <header>
                <h1><a href="/" onClick={function(e){
                    console.log(this.state.test);
                    e.preventDefault();
                    this.setState({
                        test:this.state.test
                    });
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;