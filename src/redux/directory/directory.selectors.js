import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectDirectory = state => state.directory;

export const selectDirectoryItems = createSelector(
  [selectDirectory],
  directory => directory.items
);

export const selectDirectoryFilteredCategories = createSelector(
  [selectDirectory],
  directory => directory.filteredCategories
)

export const selectItemDetails = memoize((itemId) => 
  createSelector(
    [selectDirectory],
    directory => directory.items ? directory.items.filter(
      item => item.id === itemId
    ) : null
  )
);

export const selectFilteredItems = itemId => 
  createSelector(
    [selectDirectory],
    directory => directory.filteredCategories ? directory.filteredCategories.filter(
      item => item.id === itemId
    ) : null
  );

  export const selectIsDirectoryFetching = createSelector(
    [selectDirectory],
    directory => directory.isFetching
  );  
