import React, { useState } from 'react';

const Form = (props) => {
  const { onAdd } = props;
  const [value, setValue] = useState('');

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (value.trim() !== '') {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="Qu'avez-vous à faire ?"
        autoFocus
        onChange={handleChange}
        value={value}
      />
      <input className="hidden" type="submit" value="Ajouter" />
    </form>
  );
};

export default Form;
