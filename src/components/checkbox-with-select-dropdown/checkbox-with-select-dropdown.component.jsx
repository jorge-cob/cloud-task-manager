import React from 'react';

import {
  Select,
  InputLabel,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';


const CheckboxWithSelectDropdown = ({ label, isChecked, onChangeCheck, dropdownLabel, options, selectedOption, onChangeDropdown}) => {
  
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
        <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={onChangeCheck} name="checkedA" />}
            label={label}
        />

        { isChecked && (
          <div style={{ paddingBottom: '22px' }}>
            <InputLabel style={{margin: '20px 0px 5px 0px'}}> {dropdownLabel} </InputLabel>
            <Select
              native
              value={selectedOption}
              onChange={onChangeDropdown}
            >
              {
                Object.keys(options).map(key => 
                  <option key={key} value={key}>{options[key]}</option>
                )
              }
            </Select>
          </div>
        )}
    </div>
  );
};

export default CheckboxWithSelectDropdown;
