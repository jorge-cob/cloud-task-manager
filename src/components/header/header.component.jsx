import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Chip } from '@material-ui/core';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectDirectoryFilteredCategories } from '../../redux/directory/directory.selectors';
import { selectCategoryItems } from '../../redux/category/category.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { addNewCategoryToFilter } from '../../redux/directory/directory.actions';

import { HeaderContainer, OptionsContainer, OptionLink } from './header.styles';
import CategoryFilter from '../category-filter/category-filter.component';


const Header = () => {

  const dispatch = useDispatch();

  const {user} = useSelector(createStructuredSelector({
    user: selectCurrentUser,
  }));

  const handleFilteredCategories = categoryId => {
    dispatch(addNewCategoryToFilter(categoryId));
  }

  return (
    <HeaderContainer>
      <CategoryFilter />
      <OptionsContainer>
        {
          user ?
          <OptionLink as='div' onClick={() => dispatch(signOutStart())}>SIGN OUT</OptionLink>
          :
          <OptionLink to='/signin'> SIGN IN </OptionLink>
        }
      </OptionsContainer>
    </HeaderContainer>
  );
}

export default Header;
