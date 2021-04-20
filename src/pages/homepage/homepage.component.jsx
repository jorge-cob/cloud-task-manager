import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { HomePageContainer } from './homepage.styles';

import { fetchItemsStart } from '../../redux/directory/directory.actions';
import { fetchCategoriesStart } from '../../redux/category/category.actions';

import DirectoryOverviewContainer from '../../components/directory/directory-overview.container';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemsStart());
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <HomePageContainer>
      <DirectoryOverviewContainer />
    </HomePageContainer>
  )
};

export default HomePage;
