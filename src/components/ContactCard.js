import React from 'react';
import { Link } from 'react-router-dom';

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
        <div className="item">
            <div className="content" style={{marginTop: "15px"}}>
                <Link to={{pathname: `/contact/${id}`, state:{contact: props.contact}}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <i className="trash alternate outline icon" style={{color:"red", float:"right", marginBottom: "15px"}}
                onClick={() => props.clickHandler(id)}
            ></i>
        </div>
    );
};

export default ContactCard;