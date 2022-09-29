// TODO: unit tests
export const getNonExistingElements = <T>(
  oldArray: T[],
  newArray: T[],
  equals: (fromValue: T, toValue: T) => boolean,
): T[] => {
  return newArray.filter((newEl) => !oldArray.find((oldEl) => equals(newEl, oldEl)));
};
