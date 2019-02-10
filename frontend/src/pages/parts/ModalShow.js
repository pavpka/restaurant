import React, {Component} from 'react';
import './css/ModalShow.css';

class ModalShow extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
    }

    unlockSelect(){
        document.getElementById("exampleFormControlSelect3").disabled = false;
    }

    checkForm(){
        if (document.getElementById("input-surname").value==="" || document.getElementById("input-name").value===""||
            document.getElementById("input-pat").value==="" ||document.getElementById("exampleFormControlSelect1").value===""||
            document.getElementById("exampleFormControlSelect2").value===""||document.getElementById("exampleFormControlSelect3").value==="" || (
            !document.getElementById("checkCuisine1").checked && !document.getElementById("checkCuisine2").checked &&
            !document.getElementById("checkCuisine3").checked)){
            alert("Fill in all fields!");
        }
        else{
            let rus=0,it=0,jap=0;
            if (document.getElementById("checkCuisine1").checked) rus=1;
            if (document.getElementById("checkCuisine2").checked) it=1;
            if (document.getElementById("checkCuisine3").checked) jap=1;
            let data = {
                name: this.refs.inputName.value,
                surname: this.refs.inputSurname.value,
                patronymic: this.refs.inputPatronymic.value,
                work_shift: +this.refs.selectShift.value,
                schedule: +this.refs.selectSchedule.value,
                rus_cuisine: rus,
                it_cuisine: it,
                jap_cuisine: jap,
                hours: +this.refs.selectHours.value
            };
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function (response) {
                response.json().then(function (data) {
                    console.log(data);
                })
            });
            document.getElementById("modal-form").reset();
            document.getElementById("cancel-button").click();
        }
    }
    render() {
        return (
            <div>
                <button id="buttonHome0" className="btn btn-light" data-toggle="modal" data-target="#exampleModal">
                    <h5>Add a new cook</h5>
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Adding a new cook</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="was-validated" id="modal-form">
                                        <div className="form-group">
                                            <label htmlFor="recipient-name" className="col-form-label">Surname:</label>
                                            <input maxLength="20" ref="inputSurname"  className="form-control" id="input-surname" placeholder="Surname" required/>
                                            <div className="invalid-feedback">
                                                Please write a surname.
                                            </div>
                                        </div>
                                    <div className="form-group">
                                        <label For="message-text" className="col-form-label">Name:</label>
                                        <input className="form-control" maxLength="15"ref="inputName" id="input-name" placeholder="Name" required/>
                                        <div className="invalid-feedback">
                                            Please write a name.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label For="message-text" className="col-form-label">Patronymic:</label>
                                        <input className="form-control" maxLength="25" ref="inputPatronymic"  id="input-pat" placeholder="Patronymic" required/>
                                        <div className="invalid-feedback">
                                            Please write a patronymic.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label For="exampleFormControlSelect1">Choose a work shift:</label>
                                        <select className="form-control" ref="selectShift" id="exampleFormControlSelect1" required onChange={this.unlockSelect}>
                                            <option> </option>
                                            <option value="1">1 - 10:00-17:00</option>
                                            <option value="2">2 - 17:00-24:00</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please choose one of the options.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect2">Choose a work schedule</label>
                                        <select className="form-control" ref="selectSchedule" id="exampleFormControlSelect2" required>
                                            <option> </option>
                                            <option value="1">5/2</option>
                                            <option value="2">2/2</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please choose one of the options.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="checkbox" className="form-check-input" id="checkCuisine1"/>
                                        <label className="form-check-label" For="checkCuisine1">Russian
                                            Cuisine</label>
                                        <input type="checkbox" className="form-check-input" id="checkCuisine2"/>
                                        <label className="form-check-label" For="checkCuisine2">Italian
                                            Cuisine</label>
                                        <input type="checkbox" className="form-check-input" id="checkCuisine3"/>
                                        <label className="form-check-label" For="checkCuisine3">Japanese
                                            Cuisine</label>
                                        <div className="invalid-feedback">
                                            Please select existing certification.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label For="exampleFormControlSelect3">How much working hours?</label>
                                        <select className="form-control" ref="selectHours" id="exampleFormControlSelect3" disabled required>
                                            <option> </option>
                                            <option value="4">4 hours</option>
                                            <option value="5">5 hours</option>
                                            <option value="6">6 hours</option>
                                            <option value="7">7 hours</option>
                                            <option value="8">8 hours</option>
                                            <option value="9">9 hours</option>
                                            <option value="10">10 hours</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            Please choose one of the options.
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" id="ok-button" onClick={this.checkForm.bind(this)} >Add cook</button>
                                <button type="button" className="btn btn-secondary" id="cancel-button" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ModalShow;