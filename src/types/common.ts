// 공통 응답 구조
export interface DataResponse<T> {
  data: T;
  meta?: Meta;
}

export interface CollectionResponse<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// 기본 엔티티 구조
export interface BaseEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// API 응답 래퍼
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  details?: any;
}
