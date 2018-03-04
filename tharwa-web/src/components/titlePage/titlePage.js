import React, { Component } from 'react';

import './style.css';
export default class TitlePage extends Component {
    state = {  }
    render() {
        return (
            <div className="title">
            {this.props.title}
            </div>
        );
    }
}