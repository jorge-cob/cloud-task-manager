import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectDirectory = state => state.directory;

export const selectDirectoryItems = createSelector(
  [selectDirectory],
  directory => directory.items
);

export const selectItemDetails = memoize((itemId) => 
createSelector(
  [selectDirectory],
  directory => directory.items ? directory.items.filter(
    item => item.id === itemId
  ) : null
)
);
