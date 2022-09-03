export const lowercaseKeys = (
  object: Record<string, any>,
): Record<string, any> => {
  let key: string;
  const keys = Object.keys(object);
  let n = keys.length;
  const newobj = {};
  while (n--) {
    key = keys[n];
    newobj[key.toLowerCase()] = object[key];
  }
  return newobj;
};
