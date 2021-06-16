import React from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { LabelItem, PickerContainer } from './color-picker-toggle.styles';


const ColorPickerToggle = ({ selectedColor, handleChange, colors, label }) => {

  const handleOnChange =  (event, newValue) => {
    handleChange(newValue);
  }

  return (
    <PickerContainer>
      <LabelItem>{label}</LabelItem>
      <ToggleButtonGroup
        value={selectedColor}
        exclusive
        onChange={handleOnChange}
        size="small"
      >
        {
          colors && colors.map(color => {
            return (
              <ToggleButton 
                key={color} 
                value={color} 
                style={{ 
                  alignSelf: 'center', 
                  width: `${selectedColor === color ? '34px' : '30px'}` , 
                  height: `${selectedColor === color ? '34px' : '30px'}`, 
                  backgroundColor: `${color}`, 
                  marginLeft: '5px', 
                  borderRadius: '10px',
                }}
              >
                <span />
              </ToggleButton> 
            )
          })
        }
      </ToggleButtonGroup>
    </PickerContainer>
  );
};

export default ColorPickerToggle;
