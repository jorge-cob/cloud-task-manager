export const addItem = (directoryItems, payload) => {
  const { id, categories, title, description, isTodo, status, color, index, dateTime } = payload;
  const existingItem = directoryItems.find(
    item => item.id === id
  );
  if (existingItem) {
    return directoryItems.map(item => 
      item.id === id
        ? { ...item, title: title, description: description, isTodo: isTodo, status: status, categories: categories, color: color, index: index, dateTime: dateTime } 
        : item 
    )
  }
  return [{ id: id, title: title, description: description, isTodo: isTodo, status: status, categories: categories, color: color, dateTime:dateTime, index: directoryItems.length > 0 ? directoryItems[0].index + 100000000 : 100000000 }, ...directoryItems]
};

export const removeItem = (directoryItems, payload) => directoryItems.filter(item => item.id !== payload);

export const itemIsBeingShown = (item, filteredCategories, filteredStatus, filterType) => {
  const { categories, isTodo, status } = item;
  const isCategoryFiltered = !filteredCategories || filteredCategories.length === 0 
    || (categories 
    && categories.some(categoryId=> filteredCategories && filteredCategories.indexOf(categoryId) !== -1) );

  const typeFilter = filterType === 'all' || (filterType === 'todo' && isTodo) || (filterType === 'regular' && !isTodo);
  const statusIsFiltered = filterType !== 'todo' || ( isTodo && filteredStatus.indexOf(status) !== -1 ) || !isTodo

  return isCategoryFiltered && typeFilter && statusIsFiltered;
};
