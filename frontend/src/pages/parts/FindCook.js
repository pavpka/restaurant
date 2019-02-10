import React, {Component} from 'react';
import './css/FindCook.css';


class FindCook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Find a cook'
        }
    }

    componentDidMount() {
        console.log('work');
    }

    deleteCook() {
    }

    SearchingResults(event) {
        event.preventDefault();
        let cooks;
        let data = {
            name: this.refs.inputName.value,
            surname: this.refs.inputSurname.value
        };
        if (data.name === "" || data.surname === "") {
            alert("Enter data to search");
        }
        else {
            //xmlhttprequest()
            fetch('/cooks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function (response) {
                response.json().then(function (data) {
                    //console.log(data);
                });
            });

            fetch('/cooks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                response.json().then(function (req) {
                    cooks = req;
                    let div = document.createElement('div');
                    div.className = "tableRes";
                    let resTable = [];
                    resTable[0] = "<table><tr><th>surname</th><th>name</th>" +
                        "<th>patronymic</th><th>shift</th>" +
                        "<th>hours</th><th></th></tr>";
                    for (var line = 0; line < cooks.length; line++) {
                        resTable[line + 1] = "<tr><td>" + cooks[line].surname + "</td><td>" +
                            cooks[line].name + "</td><td>" +
                            cooks[line].patronymic + "</td><td>" +
                            cooks[line].work_shift + "</td><td>" +
                            cooks[line].hours + "</td><td><button id = 'buttonDelete' className='btn btn-light' type='button'>delete</button><button id='buttonEdit'>edit</button></td></tr>";
                    }
                    resTable[line + 2] = "</table>";
                    div.innerHTML = resTable.join('');
                    test.appendChild(div);
                   // console.log(cooks.length);
                })

            });
        }
    }


    render() {
        let title = this.state.title;
        return (
            <div>
                <div className="FindTitle">{title}</div>
                <form className="needs-validation" noValidate ref="inputForm" id="test">
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationTooltip01">Name</label>
                            <input type="text" className="form-control" ref="inputName" id="validationTooltip01"
                                   placeholder="Name" required/>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationTooltip02">Surname</label>
                            <input type="text" className="form-control" ref="inputSurname" id="validationTooltip02"
                                   placeholder="Surname"
                                   required/>
                        </div>
                    </div>
                    <button className="btn btn-light" onClick={this.SearchingResults.bind(this)}>Find</button>
                </form>

            </div>
        )
    }
}

export default FindCook;