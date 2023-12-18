import React, { useState } from 'react';

const TodoItem = (props) => {
  const {
    id,
    name,
    complete,
    editing,
    onEdit,
    onChange,
    onComplete,
    onDestroy,
  } = props;

  const [value, setValue] = useState(name);

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onChange(id, value);
  };

  return (
    <li className={editing ? 'editing' : complete ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={complete}
          onChange={() => onComplete(id)}
          id={`todo-${id}`}
        />
        <label onDoubleClick={onEdit}>{name}</label>
        <button className="destroy" onClick={() => onDestroy(id)} />
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="edit"
            autoFocus
            value={value}
            onChange={handleChange}
            onBlur={handleSubmit}
          />
          <input type="submit" className="hidden" value="Valider" />
        </form>
      )}
    </li>
  );
};

export default TodoItem;
