import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Chip } from '@material-ui/core';

import { selectDirectoryFilteredCategories } from '../../redux/directory/directory.selectors';
import { selectCategoryItems } from '../../redux/category/category.selectors';
import { addNewCategoryToFilter, removeCategoryFromFilter } from '../../redux/directory/directory.actions';



const CategoryFilter = () => {

  const dispatch = useDispatch();

  const {categories, filteredCategories} = useSelector(createStructuredSelector({
    categories: selectCategoryItems,
    filteredCategories: selectDirectoryFilteredCategories
  }));

  const handleFilteredCategories = categoryId => {
    if (filteredCategories.includes(categoryId)) {
      dispatch(removeCategoryFromFilter(categoryId));
    } else {
      dispatch(addNewCategoryToFilter(categoryId));
    }
  }

  return (
  
      <div>
      {
        categories && categories.map(category => {
          return (
            <Chip 
              key={category.id} 
              label={category.title} 
              variant="outlined" 
              color="secondary" 
              onClick={() => handleFilteredCategories(category.id)}
              style={{backgroundColor: `${filteredCategories.includes(category.id) ? 'green' : ''}`}}
            />
          )
        })
      }
      </div>

  );
}

export default CategoryFilter;
