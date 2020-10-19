export const ellipsis = (value: string, length: number) => {
  return value.length <= length ? value : `${value.slice(0, length)}...`;
};
