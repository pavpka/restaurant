import React, {Component} from 'react';
import Head from "./parts/Head";
import './css/Schedule.css';


class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "Select one of the restaurants"
        }
    }
    unlockButton() {
        document.getElementById("schedule-button").disabled =
            document.getElementById("select-restaurant").value === "";
    }
    componentDidMount() {
        console.log('work');
    }

    getSchedule(event) {
        let nodes;
        event.preventDefault();
        let restaurant = {
            number: this.refs.selectRes.value
        };
        fetch('/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(restaurant)
        }).then(function (response) {
            response.json().then(function (restaurant) {
                console.log(restaurant);
            });
        });
        fetch('/schedule', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            response.json().then(function (req) {
                nodes = req;
                let div = document.createElement('div');
                div. className = 'tableRes';
                let resTable=[];
                resTable[0] = "<table><tr><th>date</th><th>surname</th>" +
                    "<th>name</th><th>patronymic</th>" +
                    "<th>shift</th><th>cuisine</th><th>time</th></tr>";
                for (var line =0; line<nodes.length; line++){
                    var date = nodes[line].day+1;
                    resTable[line+1]="<tr><td>"+date+" March</td><td>"+
                        nodes[line].surname+"</td><td>"+
                        nodes[line].name+"</td><td>"+
                        nodes[line].patronymic+"</td><td>"+
                        nodes[line].work_shift+"</td><td>"+
                        nodes[line].cuisine+"</td><td>"+
                        nodes[line].work_time+"</td></tr>";
                }
                resTable[line+2]="</table>";
                div.innerHTML = resTable.join('');
                test.appendChild(div);
            })
        })
    }
    render() {
        let title = this.state.title;
        return (
            <div className="schedule-page">
                <Head/>
                <div id="test">
                <form id="schedule-form">
                    <div className="form-row">
                        <label htmlFor="select-restaurant">{title}</label>
                        <select ref="selectRes" onChange={this.unlockButton} id="select-restaurant">
                            <option value="">   </option>
                            <option value="1">1</option>
                        </select>
                    </div>
                    <button className="btn btn-light" id="schedule-button" onClick={this.getSchedule.bind(this)}>Show schedule</button>
                </form>
                </div>
            </div>
        )
    }
}

export default Schedule;