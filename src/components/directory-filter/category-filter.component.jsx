import React from 'react';
import { useDispatch } from 'react-redux';

import { addNewCategoryToFilter } from '../../redux/directory/directory.actions';

import { CategoryChip, CategoryMenuContainer, IconEditItem } from './filter.styles';



const CategoryFilter = (props) => {
  const { filteredCategories, categories } = props;
  const dispatch = useDispatch();

  const handleFilteredCategories = categoryId => {
    dispatch(addNewCategoryToFilter(categoryId));
  }

  const handleEditClick = e => {
    e.stopPropagation(); 
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
                style={{backgroundColor: category?.color, color: category?.textColor}}
              >
                <span style={{paddingRight: '15px', color: category?.textColor}}>
                  { category.title.length > 10 ? `${category.title.substring(0,10)}...` : category.title  } 
                </span>
                <IconEditItem onClick={handleEditClick} fill={category?.textColor} />
              </CategoryChip>
            )
          }
        })
      }
      </CategoryMenuContainer>
  );
}

export default CategoryFilter;
