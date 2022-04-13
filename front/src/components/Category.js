import React, { Component } from 'react';

export default class Category extends Component {
    render = () => {
        return (
            <div>
                <h4 className='Category'>{this.props.name}</h4>
                {this.props.elements.map((elem, index) => {
                    return (<div key={index} style={{paddingLeft: '10px'}}>{elem}</div>);
                })}
            </div>
        )
    }
}