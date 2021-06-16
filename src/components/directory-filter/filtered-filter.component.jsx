import React from 'react';
import { useDispatch } from 'react-redux';

import { removeCategoryFromFilter } from '../../redux/directory/directory.actions';

import { FilteredCategoryChip, CategoryMenuContainer, IconCloseItem, IconEditItem } from './filter.styles';



const FilteredFilter = (props) => {
  const { filteredCategories, categories, handleEditCategory } = props;
  const dispatch = useDispatch();

  const handleFilteredCategories = categoryId => {
    dispatch(removeCategoryFromFilter(categoryId));
  };

  const handleEditClick = (e, category) => {
    e.stopPropagation();
    handleEditCategory(category);
  }
  return (
      <CategoryMenuContainer>
      {
        categories && categories.map(category => {
          if (filteredCategories && filteredCategories.includes(category.id)) {
            return (
              <FilteredCategoryChip 
                key={category.id} 
                onClick={() => handleFilteredCategories(category.id)}
                backgroundColor={category?.color}
              >
                <IconCloseItem fill={category?.textColor} />
                <span style={{paddingRight: '15px', color: category?.textColor}}>
                  { category.title.length > 10 ? `${category.title.substring(0,10)}...` : category.title  } 
                </span>
                <IconEditItem onClick={e => handleEditClick(e, category)} fill={category?.textColor} />
              </FilteredCategoryChip>
            )
          }
        })
      }
      </CategoryMenuContainer>

  );
}

export default FilteredFilter;
