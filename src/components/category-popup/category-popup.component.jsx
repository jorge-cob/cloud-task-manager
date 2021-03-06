import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Popup1 from '../popup/popup.component';
import { addNewCategory } from '../../redux/category/category.actions';
import { HexColorPicker } from 'react-colorful';
import './color-picker.styles.css';
import ColorPickerToggle from '../color-picker-toggle/color-picker-toggle.component';



const CategoryPopup = ({ open, handleClose }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#f2f0eb');
  const [textColor, setTextColor] = useState('#000000');
  const [titleErrorText, setTitleErrorText] = React.useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!title) {
      setTitleErrorText('Please enter title');
    } else {
      const newCategoryId = uuidv4();
      dispatch(addNewCategory({categoryId: newCategoryId, title, description, color, textColor}));
      setTitleErrorText('');
      setTitle('');
      setDescription('');
      handleClose();
      setColor('');
      setTextColor('#000000');
    }
  };
  
  return (
    <Popup1 open={open} handleClose={handleClose} label='New Category' textColor={textColor} backgroundColor={color}>
      <form  noValidate>
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={title}
              onChange={e => setTitle(e.target.value)}
              error={!!titleErrorText}
              helperText={titleErrorText}
            />
            <TextField
              margin="dense"
              id="name"
              label="Description"
              type="text"
              rows={3}
              fullWidth
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <ColorPickerToggle 
              selectedColor={textColor}
              handleChange={col => setTextColor(col)}
              label='Text Color'
              colors={['#f2f0eb', '#000000', 'red', 'yellow', 'blue', 'green', 'brown']}
            />
            <section className='custom-color-picker'>
              <HexColorPicker color={color} onChange={setColor} />
            </section>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Popup1>
  );
};

export default CategoryPopup;
