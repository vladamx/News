const htmlTags = /(<([^>]+)>)/gi;
export const escapeHtml = (value: string) => {
  return value.replace(htmlTags, '');
};
