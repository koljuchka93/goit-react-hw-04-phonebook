import {useState } from "react";
import PropTypes from "prop-types";

export const ContactForm = ({onSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
      const { name, value } = e.Target;
      switch (name) {
        case 'name':
            setName(value);
            break;

        case 'number':
            setNumber(value);
            break;

    default:
        return;
    }
  };

  const handleSubmit = e => {
      e.preventDefault();
      onSubmit(name, number);
      setName('');
      setNumber('');
  };

    return (
          <form onSubmit={handleSubmit}>
              <label>Name
                  <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      placeholder="Name" />
              </label>
              <label>Number
                  <input 
                      type="text"
                      name="number"
                      value={number}
                      onChange={handleChange}
                      placeholder="099-00-00" />
              </label>
              <button type="submit">
                      Add contact
                  </button>
          </form>
      )
  }

ContactForm.propTypes = {
onSubmit: PropTypes.func.isRequired,
};