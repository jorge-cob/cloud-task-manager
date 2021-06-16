export const addCategory = (categoryItems, payload) => {
  const { newItemId, title, description, color } = payload;
  return [...categoryItems, { id: newItemId, title, description, color }]
};
