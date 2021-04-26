import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectoryFilteredCategories } from '../../redux/directory/directory.selectors';
import { selectCategoryItems } from '../../redux/category/category.selectors';
import { addNewCategoryToFilter, removeCategoryFromFilter } from '../../redux/directory/directory.actions';

import { CategoryChip, CategoryMenuContainer } from './category-filter.styles';



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
  
      <CategoryMenuContainer>
      {
        categories && categories.map(category => {
          return (
            <CategoryChip 
              key={category.id} 
              label={category.title} 
              color={`${filteredCategories && filteredCategories.includes(category.id) ? 'primary' : 'default'}`} 
              onClick={() => handleFilteredCategories(category.id)}
            />
          )
        })
      }
      </CategoryMenuContainer>

  );
}

export default CategoryFilter;
