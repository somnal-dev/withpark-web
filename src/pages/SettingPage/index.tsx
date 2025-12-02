import { useState, useEffect } from "react";
import Styled from "./SettingPage.styles";
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import Input from "@withpark/ui/components/Input";
import Textarea from "@withpark/ui/components/Textarea";
import Label from "@withpark/ui/components/Label";
import FormGroup from "@withpark/ui/components/FormGroup";
import ProfileImageUpload from "@withpark/ui/components/ProfileImageUpload";
import useUserInfo from "@withpark/api/queries/useUserInfo";
import useUpdateUserInfoMutation from "@withpark/api/mutations/useUpdateUserInfoMutation";
import useAlert from "@withpark/hooks/useAlert.ts";
import useDeleteUserMutation from "@withpark/api/mutations/useDeleteUserMutation.ts";
import { useNavigate } from "react-router-dom";
import { PATH } from "@withpark/constants/routes.ts";
import { useCloseAllDialogs } from "@withpark/ui/components/Dialog/context.ts";
import { useCloseAllAlerts } from "@withpark/ui/components/Alert/context.ts";

interface UserSettings {
  nickname: string;
  introduction: string;
  photoUrl: string | null;
}

const SettingPage = () => {
  const { data: userInfo, isLoading } = useUserInfo();

  const navigate = useNavigate();

  const closeAllAlerts = useCloseAllAlerts();
  const closeAllDialogs = useCloseAllDialogs();

  const updateUserInfoMutation = useUpdateUserInfoMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const [settings, setSettings] = useState<UserSettings>({
    nickname: "",
    introduction: "",
    photoUrl: null,
  });

  const [isEdited, setIsEdited] = useState(false);

  const alert = useAlert();

  // 사용자 정보가 로드되면 상태 업데이트
  useEffect(() => {
    if (userInfo) {
      setSettings({
        nickname: userInfo.nickname || "",
        introduction: userInfo.introduction || "",
        photoUrl: userInfo.photo?.url ?? null,
      });
    }
  }, [userInfo]);

  const handleInputChange = (field: keyof UserSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsEdited(true);
  };

  const handleSave = async () => {
    if (!userInfo?.id) return;

    try {
      await updateUserInfoMutation.mutateAsync({
        userId: userInfo.id,
        data: {
          photoUrl: settings.photoUrl ?? undefined,
          nickname: settings.nickname,
          introduction: settings.introduction,
        },
      });
      setIsEdited(false);
      alert.open({
        content: <>설정이 저장되었습니다.</>,
      });
    } catch (error) {
      console.error("설정 저장 실패:", error);
      alert.open({
        content: <>설정 저장에 실패했습니다.</>,
      });
    }
  };

  const handleDeleteAccount = async () => {
    alert.open({
      content: <>정말로 계정을 삭제하시겠습니까?</>,
      cancelText: "아니요",
      confirmText: "네",
      onConfirm: async () => {
        if (!userInfo?.id) return;

        try {
          await deleteUserMutation.mutateAsync({ userId: userInfo.id });

          closeAllAlerts();
          closeAllDialogs();

          navigate(PATH.INTRO, { replace: true });
        } catch (error) {
          console.error("회원 탈퇴 실패:", error);
          const errorMessage = error instanceof Error ? error.message : "회원 탈퇴에 실패했습니다.";
          alert.open({
            content: <>{errorMessage}</>,
          });
        }
      },
    });
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Styled.ContentGrid>
      {/* 프로필 정보 */}
      <Card title="프로필 정보">
        <FormGroup>
          <Label>프로필 사진</Label>
          <ProfileImageUpload
            imageUrl={settings?.photoUrl || undefined}
            onImageChange={(photoUrl) => handleInputChange("photoUrl", photoUrl)}
            userId={userInfo?.id}
            size="medium"
          />
        </FormGroup>

        <FormGroup>
          <Label>닉네임</Label>
          <Input
            type="text"
            value={settings.nickname}
            onChange={(e) => handleInputChange("nickname", e.target.value)}
            placeholder="닉네임을 입력해주세요"
          />
        </FormGroup>

        <FormGroup>
          <Label>자기소개</Label>
          <Textarea
            value={settings.introduction}
            onChange={(e) => handleInputChange("introduction", e.target.value)}
            placeholder="자신을 소개해주세요..."
          />
        </FormGroup>

        {/* 저장 버튼 */}
        <Styled.ButtonGroup>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isEdited || updateUserInfoMutation.isPending}
          >
            {updateUserInfoMutation.isPending ? "저장 중..." : "저장"}
          </Button>
        </Styled.ButtonGroup>
      </Card>

      {/* 계정 관리 */}
      <Card title="계정 관리">
        <Styled.ActionItem danger>
          <Styled.ActionContent>
            <Styled.ActionTitle danger>계정 삭제</Styled.ActionTitle>
            <Styled.ActionDescription>
              이 작업은 되돌릴 수 없습니다.
            </Styled.ActionDescription>
          </Styled.ActionContent>
          <Styled.ActionButtonWrapper>
            <Button variant="danger" onClick={handleDeleteAccount}>
              삭제
            </Button>
          </Styled.ActionButtonWrapper>
        </Styled.ActionItem>
      </Card>
    </Styled.ContentGrid>
  );
};

export default SettingPage;
