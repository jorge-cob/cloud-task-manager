import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addNewItem } from '../../redux/directory/directory.actions';
import { addNewCategory } from '../../redux/category/category.actions';

import CustomButton from '../custom-button/custom-button.component';
import Popup1 from '../popup/popup.component';
import ItemInput from '../item-input/item-input.component';

const ButtonWithPopupWithSubmit = ({ label, popupLabel }) => {
  const dispatch = useDispatch();
  const [isPopupOpen, setOpenPopup] = useState(false);
  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleNewItem = (categoryId, title, description, isTodo, status) => {
    const newItemId = uuidv4();
    handleClosePopup();
    dispatch(addNewItem(categoryId, newItemId, title, description, isTodo, status));
  };

  const handleNewCategory = (title, description) => {
    const newItemId = uuidv4();
    dispatch(addNewCategory(newItemId, title, description));
  };

  return (
    <div>
      <CustomButton onClick={handleClickOpenPopup}>
        {label}
      </CustomButton>
      <Popup1 open={isPopupOpen} handleClose={handleClosePopup} label={popupLabel}>
        <ItemInput handleClose={handleClosePopup} handleSubmit={handleNewItem} handleCategorySubmit={handleNewCategory} />
      </Popup1>
    </div>
  )
};

export default ButtonWithPopupWithSubmit;
