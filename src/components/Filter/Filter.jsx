

import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, onFilterChange }) => (
  <label>
    Filter contacts by name:
    <input
      type="text"
      value={filter}
      onChange={onFilterChange}
    />
  </label>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
