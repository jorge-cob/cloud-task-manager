export const addItem = (directoryItems, payload) => {
  const { newItemId, title, description, isTodo, status } = payload;
  const existingItem = directoryItems.find(
    item => item.id === newItemId
  );
  if (existingItem) {
    return directoryItems.map(item => 
      item.id === newItemId
        ? { ...item, title: title, description: description, isTodo: isTodo, status: status } 
        : item 
    )
  }
  return [...directoryItems, { id: newItemId, title: title, description: description, isTodo: isTodo, status: status }]
};

export const addCategoryToFilter = (filteredCategories, payload) => {
  return [...filteredCategories, payload]
};

export const removeCategoryFromFilter = (filteredCategories, payload) => {
  return filteredCategories.filter(categoryId => categoryId !== payload);
};
