import { BaseEntity, CollectionResponse, ApiResponse } from "./common";
import { User } from "./user";

export interface Place extends BaseEntity {
  name: string;
  area: string;
  address?: string;
  size?: string;
  holeCount?: string;
  longitude?: string;
  latitude?: string;
  likeCount: number;
  images?: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    createdAt: string;
    updatedAt: string;
  }[];
  author?: User;
  likes?: User[];
  comments?: PlaceCommentEntity[];
  isLiked?: boolean;
}

// Strapi v5 응답 타입
export type PlacesResponse = CollectionResponse<Place>;
export type PopularPlacesResponse = CollectionResponse<Place>;
export type PlaceResponse = ApiResponse<Place>;

// 장소 댓글 관련 타입
export interface PlaceCommentEntity extends BaseEntity {
  content: string;
  author: User;
  place: Place;
}

export interface PlaceCommentsResponse {
  comments: PlaceCommentEntity[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreatePlaceCommentRequest {
  data: {
    content: string;
    place: string; // documentId
  };
}

export interface UpdatePlaceCommentRequest {
  data: {
    content: string;
  };
}

// 장소 좋아요 관련 타입
export interface PlaceLikeResponse {
  action: "liked" | "unliked";
  likeCount: number;
  isLiked: boolean;
}

// 장소 생성/수정 요청 타입
export interface CreatePlaceRequest {
  data: {
    name: string;
    area: string;
    address?: string;
    size?: string;
    holeCount?: string;
    longitude?: string;
    latitude?: string;
    images?: number[]; // 이미지 ID 배열
  };
}

export interface UpdatePlaceRequest {
  data: Partial<CreatePlaceRequest["data"]>;
}
