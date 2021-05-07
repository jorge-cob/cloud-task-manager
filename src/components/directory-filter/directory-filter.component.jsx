import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CategoryFilter from './category-filter.component';
import TodoFilter from './todo-filter.component';

import { selectCategoryItems } from '../../redux/category/category.selectors';
import { selectDirectoryFilteredCategories, selectDirectoryFilteredStatus, selectDirectoryFilterType } from '../../redux/directory/directory.selectors';
import FilteredFilter from './filtered-filter.component';
import { FilterContainer, CategoryFilterContainer, TodoFilterContainer } from './filter.styles';

const DirectoryFilter = () => {
  const {filteredCategories, filteredStatus, categories, filterType} = useSelector(createStructuredSelector({
    filteredCategories: selectDirectoryFilteredCategories,
    filteredStatus: selectDirectoryFilteredStatus,
    categories: selectCategoryItems,
    filterType: selectDirectoryFilterType
  }));
  return (
    <FilterContainer>
      <CategoryFilterContainer>
        <FilteredFilter filteredCategories={filteredCategories} categories={categories} />
        <CategoryFilter filteredCategories={filteredCategories} categories={categories} />
      </CategoryFilterContainer>
      <TodoFilterContainer>
        <TodoFilter filteredStatus={filteredStatus} filterType={filterType} />
      </TodoFilterContainer>
    </FilterContainer>

  )
};

export default DirectoryFilter;