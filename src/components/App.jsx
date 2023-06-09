import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import initialContacts from '../initialData/contacts';

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);
    return parsedContacts;
  }
  return initialContacts;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(5),
      name,
      number,
    };
    const queryMatch = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (queryMatch) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts([contact, ...contacts]);
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const getContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    setFilter('');
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={onFilterChange} value={filter} />
      <ContactList contacts={getContacts()} onDelete={deleteContact} />
    </div>
  );
};

