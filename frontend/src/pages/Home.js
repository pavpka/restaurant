import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Head from "./parts/Head";
import ModalShow from "./parts/ModalShow";
import './css/Home.css';


class Home extends Component {
    render() {
        return (
            <div className="home-page">
                <Head/>
                <h1>Welcome to our restaurant chain</h1>
                <h2>What do you want to do?</h2>
                <ModalShow/>
                <Link to="/cooks">
                    <button className="btn btn-light" id="buttonHome"><h5>Change cook list</h5></button>
                </Link>
                <br/>
                <Link to="/schedule">
                    <button className="btn btn-light" id="buttonHome1"><h5>View schedule</h5></button>
                </Link>
            </div>
        );
    }
}

export default Home;