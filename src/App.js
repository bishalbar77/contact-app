import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import { uuid } from 'uuidv4';
import api from './api/contact';
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import ContactDetails from "./components/ContactDetails";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Retrive from api
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }
  
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  const addContactHandler = async (contact) => {
    console.log(contact);
    // setContacts([...contacts, contact]);]
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
  }

  const removeContactHander = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }
  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retrieveContacts) setContacts(retrieveContacts); 
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route 
            path="/" 
            exact 
            render={(props) => (
            <ContactList 
            {...props} 
            contacts={searchTerm.length < 1 ? contacts: searchResults} 
            getContactId={removeContactHander} 
            term={searchTerm}
            searchKeyword={searchHandler}
            />
            )}
           />
          <Route path="/add" 
            render={(props) => (
            <AddContact 
            {...props} 
            addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/contact/:id"
            component={ContactDetails} />
        </Switch>
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHander}/> */}
      </Router>
    </div>
  );
}

export default App;
