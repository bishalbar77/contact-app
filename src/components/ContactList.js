import React from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log(props);

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };
    const contacts = [{
        id: "1",
        name: "Bar",
        email: "bar@gmail.com"
    }];
    const renderContactList = contacts.map((contact) => {
        return <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>;
    });
    return (
        <div className="main" style={{paddingTop:"80px"}}>
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button green right" style={{float:"right"}}>Add Contact</button>
                </Link>
            </h2>
            <div className="ui celled list">
                {renderContactList}
            </div>
        </div>
    )};
export default ContactList;