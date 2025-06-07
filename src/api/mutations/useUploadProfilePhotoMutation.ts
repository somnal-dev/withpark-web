import {useMutation} from "@tanstack/react-query";
import {Fetcher} from "@withpark/api/fetcher.ts";

interface UploadProfilePhotoResponse {
    photoUrl: string;
}

const uploadProfilePhoto = async (file: File): Promise<UploadProfilePhotoResponse> => {
    const formData = new FormData();
    formData.append('photo', file);

    return await Fetcher.post<UploadProfilePhotoResponse>('user/photo', {
        body: formData,
        // Content-Type을 명시적으로 설정하지 않음으로써 브라우저가 자동으로 multipart/form-data를 설정하도록 함
    });
};

const useUploadProfilePhotoMutation = () => {
    return useMutation({
        mutationFn: uploadProfilePhoto,
    });
};

export default useUploadProfilePhotoMutation; 