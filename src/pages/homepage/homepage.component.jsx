import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { HomePageContainer } from './homepage.styles';

import CustomButton from '../../components/custom-button/custom-button.component';
import Directory from '../../components/directory/directory.component';
import Popup1 from '../../components/popup/popup.component';
import { addNewItem, fetchItemsStart } from '../../redux/directory/directory.actions';

const HomePage = () => {
  const dispatch = useDispatch();
  const [isPopupOpen, setOpenPopup] = useState(false);
  const handleClickOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleNewItem = (categoryId, title, description, status) => {
    const newItemId = uuidv4();
    handleClosePopup();
    dispatch(addNewItem(categoryId, newItemId, title, description, status));
    console.log('Create a new item');
  };

  useEffect(() => {
    dispatch(fetchItemsStart());
  }, []);

  return (
    <HomePageContainer>
      <Directory />
      <CustomButton onClick={handleClickOpenPopup}>
        Add item
      </CustomButton>
      <Popup1 open={isPopupOpen} handleClose={handleClosePopup} handleSubmit={handleNewItem} />
    </HomePageContainer>
  )
};

export default HomePage;