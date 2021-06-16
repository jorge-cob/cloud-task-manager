import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectCategory = state => state.categories;


export const selectCategoryProps = memoize((categoryId) => 
    createSelector(
      [selectCategory],
      category => category.items ? category.items.find(
        item => item.id === categoryId
      ) : null
    )
);

export const selectCategoryItems = createSelector(
  [selectCategory],
  category => category.items
);
