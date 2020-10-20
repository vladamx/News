export type SearchForm = {
  tag: 'search';
  search: string;
} & PageForm;
export type CategoryForm = {
  tag: 'category';
  name: string;
} & PageForm;
export type PaginationForm = {
  tag: 'pagination';
} & PageForm;

export type PageForm = {
  page: number;
  pageSize?: number;
};

export type FilterForm = SearchForm | CategoryForm | PaginationForm;
