import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Head.css';

class Head extends Component{
    render(){
        return (
            <div className="header">
                <div className="content-header">
                <Link to = "/">Main page</Link>
                </div>
                <hr/>

            </div>

        )
    }
}
export default Head;