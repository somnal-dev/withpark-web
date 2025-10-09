import { PostComment } from "@withpark/ui/components/CommentSection";
import { BaseEntity, Meta, CollectionResponse, ApiResponse } from "./common";
import { User } from "./user";

export interface Post extends BaseEntity {
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  user: User;
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
  likes?: User[];
  comments?: PostCommentEntity[];
  isLiked?: boolean;
  popularityScore?: number;
}

export interface PostCommentEntity extends BaseEntity {
  content: string;
  user: User | null;
  post: Post;
}

export interface Comment extends PostComment {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User | null;
  postId: number;
}

// Strapi v5 응답 타입
export type PostsResponse = CollectionResponse<Post>;
export type PopularPostsResponse = CollectionResponse<Post>;
export type PostResponse = ApiResponse<Post>;

// 커스텀 응답 타입 (기존 API 유지)
export interface PostsLegacyResponse {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PopularPostsLegacyResponse {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  period: "day" | "week" | "month" | "all";
  criteria: {
    description: string;
    likeWeight: number;
    viewWeight: number;
  };
}

export interface CommentsResponse {
  data: Comment[];
  meta: Meta;
}

// 게시글 생성/수정 요청 타입
export interface CreatePostRequest {
  data: {
    title: string;
    content: string;
    user: number;
    images?: number[]; // 이미지 ID 배열
  };
}

export interface UpdatePostRequest {
  data: {
    title?: string;
    content?: string;
    images?: number[]; // 이미지 ID 배열
    viewCount?: number;
  };
}

// 댓글 생성/수정 요청 타입
export interface CreateCommentRequest {
  data: {
    user: number;
    content: string;
    post: string; // documentId
  };
}

export interface UpdateCommentRequest {
  data: {
    content: string;
  };
}

// 좋아요 응답 타입
export interface LikeResponse {
  postId: number;
  action: "liked" | "unliked";
  likeCount: number;
  isLiked: boolean;
}

// 기타 타입
export type PopularPeriod = "day" | "week" | "month" | "all";

// 이미지 업로드 응답
export interface UploadResponse {
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
}
