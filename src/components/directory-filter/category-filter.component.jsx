import React from 'react';
import { useDispatch } from 'react-redux';

import { addNewCategoryToFilter } from '../../redux/directory/directory.actions';

import { CategoryChip, CategoryMenuContainer } from './filter.styles';



const CategoryFilter = (props) => {
  const { filteredCategories, categories } = props;
  const dispatch = useDispatch();

  const handleFilteredCategories = categoryId => {
    dispatch(addNewCategoryToFilter(categoryId));
  }

  return (
  
      <CategoryMenuContainer>
      {
        categories && categories.map(category => {
          if (filteredCategories && !filteredCategories.includes(category.id)) {
            return (
              <CategoryChip 
                key={category.id} 
                onClick={() => handleFilteredCategories(category.id)}
              >
                { category.title.length > 10 ? `${category.title.substring(0,10)}...` : category.title  } 
              </CategoryChip>
            )
          }
        })
      }
      </CategoryMenuContainer>
  );
}

export default CategoryFilter;
