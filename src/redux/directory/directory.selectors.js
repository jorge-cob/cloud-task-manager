import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectoryItems = createSelector(
  [selectDirectory],
  directory => directory.items
);
