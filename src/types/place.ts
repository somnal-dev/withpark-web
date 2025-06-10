import {PlaceComment} from "@withpark/ui/components/CommentSection";

export interface User {
  id: number;
  nickname: string;
  photo?: string;
}

export interface Place {
  id: number;
  area: string;
  golfClubName: string;
  address?: string;
  clubSize?: string;
  holeCount?: string;
  longitude?: string;
  latitude?: string;
  likeCount: number;
  commentCount: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlacesResponse {
  places: Place[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  metadata: {
    searchTerm?: string;
    area?: string;
  };
}

export interface PopularPlacesResponse {
  places: Place[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  metadata: {
    sortBy: string;
  };
}

export interface PlaceCommentsResponse {
  comments: PlaceComment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreatePlaceCommentRequest {
  content: string;
}

export interface UpdatePlaceCommentRequest {
  content: string;
}

export interface PlaceLikeResponse {
  action: 'liked' | 'unliked';
  likeCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
} 