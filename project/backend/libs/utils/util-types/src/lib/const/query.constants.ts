export const DEFAULT_LIST_COUNT_LIMIT = 50;
export const enum RatingQuery {
  MinCount = 0,
  MaxCount = 5
}

export const RequestQuery = {
  REQUEST_QUERY_MAX: 50,
  REQUEST_QUERY_MIN: 1,
  REQUEST_DEFAULT_PAGE: 1,
  REQUEST_DEFAULT_SORT_DIRECTION: 'desc',
} as const;

export enum RequestSort {
  Date = 'date',
}

export const RequestSortField = {
  [RequestSort.Date]: 'createdAt',
};


