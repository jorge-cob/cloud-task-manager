import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addNewItem } from '../../redux/directory/directory.actions';

import CustomButton from '../custom-button/custom-button.component';
import Popup1 from '../popup/popup.component';
import ItemInput from '../item-input/item-input.component';

const ButtonWithPopupWithSubmit = ({ label, popupLabel, onOpenCategoryPopup }) => {
  const dispatch = useDispatch();
  const [isPopupOpen, setOpenPopup] = useState(false);
  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleNewItem = (categoryId, title, description, isTodo, status, color, dateTime) => {
    const newItemId = uuidv4();
    handleClosePopup();
    dispatch(addNewItem({categories: categoryId, id: newItemId, title, description, isTodo, status, color, dateTime}));
  };

  return (
    <div>
      <CustomButton onClick={handleClickOpenPopup}>
        {label}
      </CustomButton>
      <Popup1 open={isPopupOpen} handleClose={handleClosePopup} label={popupLabel}>
        <ItemInput handleClose={handleClosePopup} handleSubmit={handleNewItem} onOpenCategoryPopup={onOpenCategoryPopup} />
      </Popup1>
    </div>
  )
};

export default ButtonWithPopupWithSubmit;
