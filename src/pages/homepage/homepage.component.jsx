import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { HomePageContainer } from './homepage.styles';

import { fetchItemsStart } from '../../redux/directory/directory.actions';
import { fetchCategoriesStart } from '../../redux/category/category.actions';

import Directory from '../../components/directory/directory.component';
import ButtonWithPopupWithSubmit from '../../components/button-with-popup-with-submit/button-with-popup-with-submit.component';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemsStart());
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <HomePageContainer>
      <Directory />
      <ButtonWithPopupWithSubmit label='New entry' popupLabel='New entry' />
    </HomePageContainer>
  )
};

export default HomePage;
