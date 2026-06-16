export type TGetTourCategoryListParams = {
  code?: string;
  name?: string;
  page?: number;
  pageSize?: number;
};

export type TCategoryListItem = {
  id: string;
  code: string;
  name: string;
};

export type TGetTourCategoryListResponse = {
  categories: TCategoryListItem[];
  totalCount: number;
};

export type TCreateCategoryParams = {
  code: string;
  name: string;
};

export type TUpdateCategoryParams = {
  code: string;
  name: string;
};
