export const addItem = (directoryItems, payload) => {
  const { categoryId, newItemId, title, description, isTodo, status } = payload;
  return [...directoryItems, { id: newItemId, category: [categoryId], title: title, description: description, isTodo: isTodo, status: status }]
};
