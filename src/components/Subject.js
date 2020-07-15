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
                <h1>{this.props.title}</h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;