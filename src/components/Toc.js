import React, { Component } from 'react';

class Toc extends Component {
    render () {
        console.log('Toc render');
        var list = [];
        var data = this.props.data;
        for(var i = 0; i < data.length; i++){
            list.push(<li key={data[i].id}><a href={"/content/"+data[i].id}>{data[i].title}</a></li>);
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