export const addItem = (directoryItems, payload) => {
  const { newItemId, title, description, isTodo, status } = payload;
  return [...directoryItems, { id: newItemId, title: title, description: description, isTodo: isTodo, status: status }]
};
