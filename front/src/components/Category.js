import React, { Component } from 'react';
import "../App.css";

export default class Category extends Component {
    render = () => {
        console.log(this.props);


        return (
            <div>
                <h4 className='Category'>{this.props.name}</h4>
                {this.props.elements.map((elem) => {
                    return (<div style={{paddingLeft: '10px'}}>{elem}</div>);
                })}
            </div>
        )
    }
}