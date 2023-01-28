export const extractSearchValue = (value: string) => {
  return value.replaceAll('@', '').trim();
};
