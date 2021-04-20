import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

import { selectCategoryItems } from '../../redux/category/category.selectors';
import CategoryPopup from '../category-popup/category-popup.component';
import MultiSelector from '../multi-selector/multi-selector.component';
import CheckboxWithSelectDropdown from '../checkbox-with-select-dropdown/checkbox-with-select-dropdown.component';


const ItemEdit = ({ handleSubmit, handleClose }) => {

  const {allCategories} = useSelector(createStructuredSelector({
    allCategories: selectCategoryItems
  }));
  const { item, categories } = useSelector(state => state.item);
  const [ title, setTitle ] = useState(item.title);
  const [ description, setDescription ] = useState(item.description);
  const [ isTodo, setIsTodo ] = useState(item.isTodo);
  const [ status, setStatus ] = useState(item.status);
  const [ category, setCategory] = useState(categories);
  const [titleErrorText, setTitleErrorText] = React.useState("");
  const [isCategoryPopupOpen, setIsCategoryOpenPopup] = useState(false);

  useEffect(() => {
    const selectedCategoriesIds = categories && categories.map(category => category.id);
   setCategory(selectedCategoriesIds);
  }, [categories]);

  const onSubmit = () => {
    if (!title) {
      setTitleErrorText("Please enter title");
    } else {
      setTitleErrorText("");
      handleSubmit(category, title, description, isTodo, status);
    }

  };

  const handleClickOpenCategoryPopup = e => {
    e.preventDefault();
    setIsCategoryOpenPopup(true);
  }

  const handleCloseCategoryPopup = () => {
    setIsCategoryOpenPopup(false);
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
            discarded: 'Discarded'
          }}
        />

        <MultiSelector 
          label='Category'
          items={allCategories}
          selectedItems={category}
          handleChange={handleChangeMultipleCategories}
        />
        <Button onClick={handleClickOpenCategoryPopup} color="primary">
          + Add Category
        </Button>
        <CategoryPopup 
          open={isCategoryPopupOpen}
          handleClose={handleCloseCategoryPopup}
        />
    
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

export default ItemEdit;
