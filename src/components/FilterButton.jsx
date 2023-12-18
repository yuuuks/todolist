import React from 'react';

const FilterButton = (props) => {
  const { onClick, label, selected } = props;

  return (
    <li>
      <button className={selected ? 'selected' : ''} onClick={onClick}>
        {label}
      </button>
    </li>
  );
};

export default FilterButton;
