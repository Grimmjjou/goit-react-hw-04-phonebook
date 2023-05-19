import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './Contacts/ContactList';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const dataLock = JSON.parse(localStorage.getItem('contacts'));
    return (
      dataLock ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function formSubmitHemdler({ name, number }) {
    const newContact = { id: nanoid(), name: name, number: number };

    if (contacts.find(contact => contact.name === name)) {
      return window.alert(`${name} is alredy in contacts.`);
    }
    setContacts(prevState => [...prevState, newContact]);
  }

  function handlerChangeFilter(evt) {
    setFilter(evt.currentTarget.value);
  }

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  function deleteContact(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm onSubmit={formSubmitHemdler} />
      <h2>Contacts</h2>
      <Filter onChange={handlerChangeFilter} />
      <ContactList contacts={filterContacts} onClick={deleteContact} />
    </div>
  );
};

export default App;
