export const addCategory = (categoryItems, payload) => {
  const { newItemId, title, description, color, textColor } = payload;
  return [...categoryItems, { id: newItemId, title, description, color, textColor }]
};
