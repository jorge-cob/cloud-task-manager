import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HexColorPicker } from 'react-colorful';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { addNewCategory, removeCategory } from '../../redux/category/category.actions';
import { selectCategoryProps } from '../../redux/category/category.selectors';

import ColorPickerToggle from '../color-picker-toggle/color-picker-toggle.component';
import Popup1 from '../popup/popup.component';

import './color-picker.styles.css';
import { removeCategoryFromFilter } from '../../redux/directory/directory.actions';


const CategoryEditPopup = ({ open, handleClose, selectedCategory }) => {
  const category = useSelector(selectCategoryProps(selectedCategory));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [textColor, setTextColor] = useState('');
  const [titleErrorText, setTitleErrorText] = React.useState('');

  useEffect(() => {
    setTitle(category?.title);
    setDescription(category?.description);
    setColor(category?.color || 'white');
    setTextColor(category?.textColor || '#000000');
  }, [category]);

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!title) {
      setTitleErrorText('Please enter title');
    } else {
      dispatch(addNewCategory(category.id, title, description, color, textColor));
      setTitleErrorText('');
      handleClose();
    }
  };

  const handleDeleteCategory  = () => {
    dispatch(removeCategory(category.id));
    dispatch(removeCategoryFromFilter(category.id));
    handleClose();
  }
  
  return (
    <Popup1 open={open} handleClose={handleClose} label='Edit Category' textColor={textColor} backgroundColor={color}>
      <form  noValidate>
        <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={title || ''}
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
              value={description || ''}
              onChange={e => setDescription(e.target.value)}
            />
            <ColorPickerToggle 
              selectedColor={textColor || ''}
              handleChange={col => setTextColor(col)}
              label='Text Color'
              colors={['#f2f0eb', '#000000', 'red', 'yellow', 'blue', 'green', 'brown']}
            />
            <section className='custom-color-picker'>
              <HexColorPicker color={color || ''} onChange={setColor} />
            </section>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { if (window.confirm('Are you sure you wish to delete this category?')) handleDeleteCategory() }}>
            Delete
          </Button>
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

export default CategoryEditPopup;
