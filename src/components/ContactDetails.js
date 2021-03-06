import React from 'react';
import { Link } from 'react-router-dom';

const ContactDetails = (props) => {
    // const { name, email } = props.location.state.contact;
    return (
        <div className="main" style={{paddingTop:"80px"}}>
            <div className="ui card centered">
                <div className="content">
                    <div className="header">{props.location.state.contact.name}</div>
                    <div className="description">{props.location.state.contact.email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui button blue center">
                        Back to Contact List
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetails;