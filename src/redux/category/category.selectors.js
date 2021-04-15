import { createSelector } from 'reselect';

const selectCategory = state => state.categories;

export const selectCategoryItems = createSelector(
  [selectCategory],
  category => category.items
);
