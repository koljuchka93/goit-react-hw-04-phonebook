import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Container } from "./Container/Container";

export const App = () => {
    const [contacts, setState] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');

  const addContact = ( name, number ) => {
    const contact = {
      id: nanoid.generate(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      alert("Enter the contact's name and number phone!");
    } else if (!/\d{3}[-]\d{2}[-]\d{2}/g.test(number)) {
      alert('Enter the correct number phone!');
    } else {
      setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  const deleteContact = contactId => {
    setState(contacts.filter(({ id }) => id !== contactId));
  };

  const changeFilter = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter),
    );
  };

  const visibleContacts = getVisibleContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChange={changeFilter} />
        )}
        {contacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          /> ) : (<p>Phonebook is empty</p>)
          }
      </Container>
    );
  
}




