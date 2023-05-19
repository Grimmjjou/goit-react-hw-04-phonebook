import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import { useState } from 'react';

function ContactForm({ onSubmit }) {
  const [state, setState] = useState({ name: '', number: '' }),
    handleChange = e => {
      const { name, value } = e.currentTarget;
      setState(prev => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };
  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = state;
    onSubmit({ name, number });
    reset();
  };
  const reset = () => {
    setState({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <input
        type="tel"
        name="number"
        value={state.number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
