export const addItem = (directoryItems, payload) => {
  const { newItemId, categoryId, title, description, isTodo, status, index } = payload;
  const existingItem = directoryItems.find(
    item => item.id === newItemId
  );
  if (existingItem) {
    return directoryItems.map(item => 
      item.id === newItemId
        ? { ...item, title: title, description: description, isTodo: isTodo, status: status, categories: categoryId, index: index } 
        : item 
    )
  }
  return [{ id: newItemId, title: title, description: description, isTodo: isTodo, status: status, categories: categoryId, index: directoryItems.length > 0 ? directoryItems[0].index + 1000 : 1000 }, ...directoryItems]
};

export const removeItem = (directoryItems, payload) => directoryItems.filter(item => item.id !== payload);

export const itemIsBeingShown = (item, filteredCategories, filteredStatus, isTodoFilter) => {
  const { categories, isTodo, status } = item;
  const isCategoryFiltered = filteredCategories.length === 0 
    || (categories 
    && categories.some(categoryId=> filteredCategories.indexOf(categoryId) !== -1) );
  const statusIsFiltered = (
    filteredStatus.length === 0 || filteredStatus.indexOf(status) !== -1
  );
  const isTodoFiltered = statusIsFiltered 
            && (
              (isTodo && isTodoFilter) 
              || !isTodoFilter
            );
  return isCategoryFiltered && isTodoFiltered;
};
