import { useMutation } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher.ts";
import type { UploadResponse } from "@withpark/types/community";

const uploadProfilePhoto = async (file: File): Promise<UploadResponse[]> => {
  return await Fetcher.upload<UploadResponse[]>(file);
};

const useUploadProfilePhotoMutation = () => {
  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: (data) => {
      // 업로드된 이미지 정보를 사용자 프로필에 업데이트하는 로직을 여기에 추가할 수 있습니다.
      console.log("업로드 완료:", data);
    },
  });
};

export default useUploadProfilePhotoMutation;
