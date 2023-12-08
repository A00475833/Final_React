import React from 'react';
import './ConfirmPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConfirmedPage = (props) => {
    const { firstName, lastName ,appointmentDate, appointmentTime } = props;

    return (
        <div className="container">
            <h1>Your appointment booking is confirmed!</h1>
            <p>Please note down the details for your convenience.</p>

            <div className="row" >
            <div className="column col-sm-6">
                    <h3>First Name:</h3>
                    <p>{firstName}</p>
                </div>
                <div className="column col-sm-6">
                    <h3>Last Name:</h3>
                    <p>{lastName}</p>
                </div>
                <div className="column col-sm-6 name-font">
                    <h3>Date:</h3>
                    <p>{appointmentDate}</p>
                </div>
                <div className="column col-sm-6">
                    <h3>Time:</h3>
                    <p>{appointmentTime}</p>
                </div>
            </div>
        </div>
    );
};

export default ConfirmedPage;