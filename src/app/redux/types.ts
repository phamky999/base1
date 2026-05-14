export type QueryResponse<T> = {
  data: T;
  message: string;
  code: number;
};
