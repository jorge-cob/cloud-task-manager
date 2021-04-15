import React from 'react';

import {
  Select,
  InputLabel,
} from '@material-ui/core';


const MultiSelector = ({ items, selectedItems, label, handleChange }) => {

  return (
    <div>
 
        <InputLabel style={{margin: '20px 0px 5px 0px'}}> {label} </InputLabel>
        <Select
          native
          value={selectedItems}
          onChange={handleChange}
          multiple
          fullWidth
        >
        {
          items && items.map(item => {
            return (
              <option key={item.id} value={item.id}> {item.title} </option>
            )
          })
        }
        </Select>
    </div>
  );
};

export default MultiSelector;
