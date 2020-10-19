export const ellipsis = (value: string, bound: number) => {
  return value.length <= bound ? value : `${value.slice(0, bound)}...`;
};
