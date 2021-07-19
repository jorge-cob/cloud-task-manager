export const addCategory = (categoryItems, payload) => {
  const { categoryId, title, description, color, textColor } = payload;
  const existingCategory = categoryItems.find(
    item => item.id === categoryId
  );
  if (existingCategory) {
    return categoryItems.map(item => 
      item.id === categoryId
        ?{...item, title, description, color, textColor }
        : item 
    )
  }
  return [...categoryItems, { id: categoryId, title, description, color, textColor }]
};

export const removeCategory = (categoryItems, payload) => categoryItems.filter(item => item.id !== payload);
