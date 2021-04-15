import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { HomePageContainer } from './homepage.styles';

import CustomButton from '../../components/custom-button/custom-button.component';
import Directory from '../../components/directory/directory.component';
import Popup1 from '../../components/popup/popup.component';
import { addNewItem, fetchItemsStart } from '../../redux/directory/directory.actions';
import { addNewCategory, fetchCategoriesStart } from '../../redux/category/category.actions';
import ItemInput from '../../components/item-input/item-input.component';

const HomePage = () => {
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
    console.log('Create a new item');
  };

  useEffect(() => {
    dispatch(fetchItemsStart());
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <HomePageContainer>
      <Directory />
      <CustomButton onClick={handleClickOpenPopup}>
        Add item
      </CustomButton>
      <Popup1 open={isPopupOpen} handleClose={handleClosePopup} label='Add a new item'>
        <ItemInput handleClose={handleClosePopup} handleSubmit={handleNewItem} />
      </Popup1>
    </HomePageContainer>
  )
};

export default HomePage;