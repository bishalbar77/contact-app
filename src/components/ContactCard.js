import React from 'react';

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
        <div className="item">
            <div className="content" style={{marginTop: "15px"}}>
                <div className="header">{name}</div>
                <div>{email}</div>
            </div>
            <i className="trash alternate outline icon" style={{color:"red", float:"right", marginBottom: "15px"}}
                onClick={() => props.clickHandler(id)}
            ></i>
        </div>
    );
};

export default ContactCard;