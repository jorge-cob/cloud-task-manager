export const addCategory = (categoryItems, payload) => {
  const { newItemId, title, description, color, textColor } = payload;
  const existingCategory = categoryItems.find(
    item => item.id === newItemId
  );
  if (existingCategory) {
    return categoryItems.map(item => 
      item.id === newItemId
        ?{...item, title, description, color, textColor }
        : item 
    )
  }
  return [...categoryItems, { id: newItemId, title, description, color, textColor }]
};