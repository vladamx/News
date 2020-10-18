export type SearchForm = {
  tag: 'search';
  search: string;
};
export type CategoryForm = {
  tag: 'category';
  name: string;
  limit?: number;
};

export type FilterForm = SearchForm | CategoryForm;
