export const validateFields = (fieldsToValidate, itemToValidate) => {
  if (Object.keys(itemToValidate).length === 0) return false;
  return fieldsToValidate.every(item =>
    Object.keys(itemToValidate).includes(item)
  );
};
