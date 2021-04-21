export const addItem = (directoryItems, payload) => {
  const { newItemId, categoryId, title, description, isTodo, status } = payload;
  const existingItem = directoryItems.find(
    item => item.id === newItemId
  );
  if (existingItem) {
    return directoryItems.map(item => 
      item.id === newItemId
        ? { ...item, title: title, description: description, isTodo: isTodo, status: status, categories: categoryId } 
        : item 
    )
  }
  return [...directoryItems, { id: newItemId, title: title, description: description, isTodo: isTodo, status: status, categories: categoryId }]
};

export const removeItem = (directoryItems, payload) => directoryItems.filter(item => item.id !== payload);
