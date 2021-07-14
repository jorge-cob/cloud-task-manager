import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';

import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';

import { selectCategoryItems } from '../../redux/category/category.selectors';
import CategoryPopup from '../category-popup/category-popup.component';
import CheckboxWithSelectDropdown from '../checkbox-with-select-dropdown/checkbox-with-select-dropdown.component';

import { HexColorPicker } from 'react-colorful';
import { DatePicker } from 'antd';
import moment from 'moment';
import MultiSelect from 'react-multi-select-component';

import '../../assets/styles/date-picker-without-global.styles.css'; // or 'antd/dist/antd.less'
import './color-picker.styles.css';

const ItemEdit = ({ handleSubmit, handleClose }) => {

  const {allCategories} = useSelector(createStructuredSelector({
    allCategories: selectCategoryItems
  }));

  const destructuredCategories = [];

  allCategories.forEach(cat => {
    destructuredCategories.push({label: cat.title, value: cat.id});
  });

  const { item, categories } = useSelector(state => state.item);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [isTodo, setIsTodo] = useState(item.isTodo);
  const [status, setStatus] = useState(item.status);
  const [category, setCategory] = useState([]);
  const [dateTime, setDateTime] = useState(item.dateTime);
  const [titleErrorText, setTitleErrorText] = React.useState('');
  const [color, setColor] = useState(item?.color || '#f2f0eb');
  const [isCategoryPopupOpen, setIsCategoryOpenPopup] = useState(false);
  const [hasDate, setHasDate] = useState(!!dateTime);

  useEffect(() => {
    const selectedCategoriesIds = categories && categories.map(category => {
     return {value: category.id, label: category.title }
    });
    setCategory(selectedCategoriesIds);
  }, [categories]);

  const onSubmit = () => {
    if (!title) {
      setTitleErrorText("Please enter title");
    } else {
      setTitleErrorText("");
      const selectedCategoriesIds = category.map(cat => cat.value);
      handleSubmit(selectedCategoriesIds, title, description, isTodo, status, color, item.index, hasDate ? dateTime : '');
    }

  };

  const handleClickOpenCategoryPopup = e => {
    e.preventDefault();
    setIsCategoryOpenPopup(true);
  }

  const handleCloseCategoryPopup = () => {
    setIsCategoryOpenPopup(false);
  };

  function handleShowDate() {
    if(!hasDate) { setDateTime(moment().format('YYYY-MM-DD HH:mm'))};
    setHasDate(!hasDate);
  }


  const handleDateChange = (date, dateString) => {
    setDateTime(dateString);
  };

  const handleChangeStatus = e => {
    setStatus(e.target.value);
  }

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
          onChangeDropdown={handleChangeStatus}
          selectedOption={status}
          dropdownLabel='Status'
          options={{ 
            pending: 'Pending',
            done: 'Done',
          }}
        />
        <MultiSelect
          options={destructuredCategories}
          value={category}
          onChange={setCategory}
          labelledBy="Select"
          hasSelectAll={false}
        />
     
        <Button onClick={handleClickOpenCategoryPopup} color="primary">
          + Add Category
        </Button>
        <CategoryPopup 
          open={isCategoryPopupOpen}
          handleClose={handleCloseCategoryPopup}
        />
        <section className='custom-color-picker'>
          <HexColorPicker color={color} onChange={setColor} />
        </section>
        
        <FormControlLabel
            control={<Checkbox checked={hasDate} onChange={handleShowDate} name="checkedA" />}
            label="Has date"
        />
        { hasDate &&
          <DatePicker
            format='YYYY-MM-DD HH:mm'
            defaultValue={null}
            value={ moment(dateTime)} 
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
            onChange={handleDateChange}
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
          />
        }
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
