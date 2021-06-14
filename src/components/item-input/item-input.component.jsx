import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

import { selectCategoryItems } from '../../redux/category/category.selectors';
import MultiSelector from '../multi-selector/multi-selector.component';
import CheckboxWithSelectDropdown from '../checkbox-with-select-dropdown/checkbox-with-select-dropdown.component';


const ItemInput = ({ handleSubmit, handleClose, onOpenCategoryPopup }) => {
  const {categories} = useSelector(createStructuredSelector({
    categories: selectCategoryItems
  }));
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ isTodo, setIsTodo ] = useState(false);
  const [ status, setStatus ] = useState('pending');
  const [ category, setCategory] = useState([]);
  const [titleErrorText, setTitleErrorText] = useState('');

  const onSubmit = () => {
    if (!title) {
      setTitleErrorText("Please enter title");
    } else {
      setTitleErrorText("");
      handleSubmit(category, title, description, isTodo, status);
    }

  };

  const handleChangeMultipleCategories = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setCategory(value);
  };

  return (
    <div>
    <form  noValidate>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          required={true}
          error={!!titleErrorText}
          helperText={titleErrorText}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          multiline
          rows={3}
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <CheckboxWithSelectDropdown
          label='Is To Do'
          isChecked={isTodo}
          onChangeCheck={e => setIsTodo(e.target.checked)}
          onChangeDropdown={e => setStatus(e.target.value)}
          selectedOption={status}
          dropdownLabel='Status'
          options={{ 
            pending: 'Pending',
            done: 'Done',
          }}
        />

        <MultiSelector 
          label='Category'
          items={categories}
          selectedItems={category}
          handleChange={handleChangeMultipleCategories}
        />
        <Button onClick={onOpenCategoryPopup} color="primary">
          + Add Category
        </Button>
      
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
    </div>
  );
};

export default ItemInput;
