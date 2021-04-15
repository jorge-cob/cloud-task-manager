export const addCategory = (categoryItems, payload) => {
  const { newItemId, title, description } = payload;
  return [...categoryItems, { id: newItemId, title: title, description: description }]
};
