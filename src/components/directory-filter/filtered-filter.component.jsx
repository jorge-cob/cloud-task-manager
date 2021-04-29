import React from 'react';
import { useDispatch } from 'react-redux';

import { removeCategoryFromFilter } from '../../redux/directory/directory.actions';

import { FilteredCategoryChip, CategoryMenuContainer, IconCloseItem } from './filter.styles';



const FilteredFilter = (props) => {
  const { filteredCategories, categories } = props;
  const dispatch = useDispatch();

  const handleFilteredCategories = categoryId => {
    dispatch(removeCategoryFromFilter(categoryId));
  };

  return (
      <CategoryMenuContainer>
      {
        categories && categories.map(category => {
          if (filteredCategories.includes(category.id)) {
            return (
              <FilteredCategoryChip 
                key={category.id} 
                onClick={() => handleFilteredCategories(category.id)}
              >
                <IconCloseItem />
                <span style={{paddingRight: '15px'}}>
                  { category.title.length > 10 ? `${category.title.substring(0,10)}...` : category.title  } 
                </span>
              </FilteredCategoryChip>
            )
          }
        })
      }
      </CategoryMenuContainer>

  );
}

export default FilteredFilter;
