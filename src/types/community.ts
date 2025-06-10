import {PostComment} from "@withpark/ui/components/CommentSection";

export interface User {
  id: number;
  nickname: string;
  photo?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  isLiked?: boolean;
  popularityScore?: number;
}

export interface Comment extends PostComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  postId: number;
}

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PopularPostsResponse {
  posts: Post[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  period: 'day' | 'week' | 'month' | 'all';
  criteria: {
    description: string;
    likeWeight: number;
    viewWeight: number;
  };
}

export interface CommentsResponse {
  comments: Comment[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  imageUrl?: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface LikeResponse {
  postId: number;
  action: 'liked' | 'unliked';
  likeCount: number;
  isLiked: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  error: string;
}

export type PopularPeriod = 'day' | 'week' | 'month' | 'all'; 