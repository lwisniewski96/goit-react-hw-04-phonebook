import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import './Phonebook.css';

function Phonebook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const handleAddContact = (name, number) => {
    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      setShowAlert(true);
      setAlertText(`Contact "${name}" is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };
  const handleAlert = text => {
    setAlertText(text);
    setShowAlert(true);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Add New Contact</h2>
      <ContactForm
        name={name}
        number={number}
        onAddContact={handleAddContact}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onAlert={handleAlert}
      />

      <h2>Contacts</h2>

      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />

      {showAlert && (
        <div className="alert">
          <p>{alertText}</p>
          <button onClick={handleAlertClose}>OK</button>
        </div>
      )}
    </div>
  );
}

export default Phonebook;
