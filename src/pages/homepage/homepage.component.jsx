import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { HomePageContainer } from './homepage.styles';

import { addNewItem, fetchItemsStart } from '../../redux/directory/directory.actions';
import { addNewCategory, fetchCategoriesStart } from '../../redux/category/category.actions';

import CustomButton from '../../components/custom-button/custom-button.component';
import Directory from '../../components/directory/directory.component';
import Popup1 from '../../components/popup/popup.component';
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
  };

  const handleNewCategory = (title, description) => {
    const newItemId = uuidv4();
    dispatch(addNewCategory(newItemId, title, description));
  };

  useEffect(() => {
    dispatch(fetchItemsStart());
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <HomePageContainer>
      <Directory />
      <CustomButton onClick={handleClickOpenPopup}>
        New entry
      </CustomButton>
      <Popup1 open={isPopupOpen} handleClose={handleClosePopup} label='New entry'>
        <ItemInput handleClose={handleClosePopup} handleSubmit={handleNewItem} handleCategorySubmit={handleNewCategory} />
      </Popup1>
    </HomePageContainer>
  )
};

export default HomePage;
