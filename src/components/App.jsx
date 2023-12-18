import React, { useState } from 'react';
import TodoItem from './TodoItem';
import Form from './Form';
import FilterButton from './FilterButton';

const App = () => {
  const [todoList, setTodoList] = useState([
    {
      id: 'todo-1',
      completed: false,
      name: 'A faire 1',
    },
    {
      id: 'todo-2',
      completed: false,
      name: 'A faire 2',
    },
    {
      id: 'todo-3',
      completed: false,
      name: 'A faire 3',
    },
  ]);

  const handleAdd = (name) => {
    setTodoList([
      {
        id: 'todo-' + Date.now(),
        completed: false,
        name,
      },
      ...todoList,
    ]);
  };

  const [filter, setFilter] = useState(null);
  const [editing, setEditing] = useState(null);

  const leftTodos = todoList.filter((todo) => !todo.completed).length;

  const handleComplete = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleDestroy = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleChange = (id, name) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              name,
            }
          : todo
      )
    );
    setEditing(null);
  };

  const handleToggleAll = () => {
    setTodoList(
      todoList.map((todo) => ({
        ...todo,
        completed: leftTodos > 0,
      }))
    );
  };

  const filterItem = (todo) =>
    filter === 'completed'
      ? todo.completed
      : filter === 'active'
      ? !todo.completed
      : true;


      const handleClearCompleted = () => {
        setTodoList(todoList.filter(todo => !todo.completed))
    }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todo</h1>
        <Form onAdd={handleAdd} />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={leftTodos === 0}
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Tout compléter</label>
        <ul className="todo-list">
          {todoList
            .filter(filterItem)
            .map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                name={todo.name}
                complete={todo.completed}
                onComplete={handleComplete}
                onDestroy={handleDestroy}
                onEdit={() => setEditing(todo.id)}
                editing={editing === todo.id}
                onChange={handleChange}
              />
            ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{leftTodos}</strong>
          {leftTodos > 1 ? ' tâches restantes' : ' tâche restante'}
        </span>
        <ul className="filters">
          <FilterButton
            label="Tous"
            onClick={() => setFilter(null)}
            selected={filter === null}
          />
          <FilterButton
            label="Complétés"
            onClick={() => setFilter('completed')}
            selected={filter === 'completed'}
          />
          <FilterButton
            label="Actifs"
            onClick={() => setFilter('active')}
            selected={filter === 'active'}
          />
        </ul>
        
        <button
        className={todoList.length > leftTodos ? 'clear-completed' : ''} onClick={handleClearCompleted}>Effacer les complétés</button>
      </footer>
    </section>
  );
};

export default App;
