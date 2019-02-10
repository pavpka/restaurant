import React from 'react';
import ReactDOM from 'react-dom'
import {Route} from 'react-router';
import {Switch,} from 'react-router-dom';
import './index.css';
import Home from "./pages/Home";
import Cooks from "./pages/Cooks";
import Schedule from "./pages/Schedule";
import BrowserRouter from "react-router-dom/es/BrowserRouter";

ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/cooks" component={Cooks}/>
                <Route path="/schedule" component={Schedule}/>
            </Switch>
        </BrowserRouter>,
    document.getElementById('root')
);

