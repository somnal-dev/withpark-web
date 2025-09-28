import { useMutation } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { UploadResponse } from "../../types/community";
import { Photo } from "@withpark/types/user";

interface UploadImageParams {
  files: File | File[];
  ref?: string; // 연결할 컬렉션 타입 (예: 'api::post.post')
  refId?: string; // 연결할 엔티티의 documentId
  field?: string; // 연결할 필드명 (예: 'images')
}

const useImageUploadMutation = () => {
  return useMutation({
    mutationFn: async ({
      files,
      ref,
      refId,
      field,
    }: UploadImageParams): Promise<Photo[]> => {
      const formData = new FormData();

      // 파일 추가
      if (Array.isArray(files)) {
        files.forEach((file) => formData.append("files", file));
      } else {
        formData.append("files", files);
      }

      // 연결 정보 추가 (옵션)
      if (ref) formData.append("ref", ref);
      if (refId) formData.append("refId", refId);
      if (field) formData.append("field", field);

      return await Fetcher.post<Photo[]>("upload", {
        body: formData,
        // Content-Type을 설정하지 않음으로써 브라우저가 자동으로 multipart/form-data를 설정하도록 함
      });
    },
    onSuccess: (data) => {
      console.log("이미지 업로드 완료:", data);
    },
    onError: (error) => {
      console.error("이미지 업로드 실패:", error);
    },
  });
};

export default useImageUploadMutation;
