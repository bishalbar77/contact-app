import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log(props);
    const inputEL = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };
    
    const renderContactList = props.contacts.map((contact) => {
        return <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>;
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEL.current.value);
    }
    return (
        <div className="main" style={{paddingTop:"80px"}}>
            <h2>Contact List
                <Link to="/add">
                    <button className="ui button green right" style={{float:"right"}}>Add Contact</button>
                </Link>
            </h2>
            <div className="ui celled list search">
                <div className="ui icon input">
                    <input 
                    ref={inputEL}
                    type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm}></input>
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : "No contacts available"}
            </div>
        </div>
    )};
export default ContactList;