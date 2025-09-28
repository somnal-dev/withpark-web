import { BaseEntity } from "./common";

export interface Photo extends BaseEntity {
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    large?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path?: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    small?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path?: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    medium?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path?: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    thumbnail?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path?: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: any;
}

export interface User extends BaseEntity {
  id: number;
  username: string;
  email?: string;
  confirmed?: boolean;
  blocked?: boolean;
  nickname: string;
  photo?: Photo | null;
  introduction?: string;
  isOnboardingDone: boolean;
  provider?: string;
  role?: {
    id: number;
    documentId: string;
    name: string;
    description?: string;
    type: string;
  };
}

export interface UpdateUserRequest {
  nickname?: string;
  introduction?: string;
  photo?: User["photo"];
  isOnboardingDone?: boolean;
}

export interface UploadProfilePhotoResponse {
  photo: User["photo"];
}
