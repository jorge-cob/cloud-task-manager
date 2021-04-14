export const addItem = (directoryItems, payload) => {
  const { categoryId, newItemId, title, description, status } = payload;
  return [...directoryItems, { id: newItemId, category: [categoryId], title: title, description: description, status: status }]
};
