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

const CategoryPopup = ({ open, handleClose }) => {

  const [ title, setTitle] = useState('');
  const [ description, setDescription ] = useState('');
  const [color, setColor] = useState('#f2f0eb');
  const [titleErrorText, setTitleErrorText] = React.useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!title) {
      setTitleErrorText('Please enter title');
    } else {
      const newItemId = uuidv4();
      dispatch(addNewCategory(newItemId, title, description, color));
      setTitleErrorText('');
      setTitle('');
      setDescription('');
      handleClose();
      setColor('');
    }
  };
  
  return (
    <Popup1 open={open} handleClose={handleClose} label='New Category'>
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
