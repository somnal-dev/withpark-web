import {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './OnboardingPage.styles';
import Card from "@withpark/ui/components/Card";
import ProgressBar from "@withpark/ui/components/ProgressBar";
import Button from "@withpark/ui/components/Button";
import useUserInfo from "@withpark/api/queries/useUserInfo.ts";
import useUpdateUserInfoMutation from "@withpark/api/mutations/useUpdateUserInfoMutation.ts";
import {PATH} from "@withpark/constants/routes.ts";

type UserInfo = {
    nickname: string;
    photo?: string;
    introduction: string;
};

const OnboardingPage = () => {
    const navigate = useNavigate();
    const {
        data: userInfo,
        isLoading: isUserInfoLoading,
        refetch: refetchUserInfo
    } = useUserInfo();
    const updateUserInfo = useUpdateUserInfoMutation();

    const [currentStep, setCurrentStep] = useState(0);
    const [onboardingUserInfo, setOnboardingUserInfo] = useState<UserInfo>({
        nickname: '',
        photo: '',
        introduction: ''
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setOnboardingUserInfo(prev => ({
            ...prev,
            ...userInfo
        }));
    }, [userInfo]);

    const onboardingSteps = [
        {
            title: "닉네임 설정",
            description: "다른 골퍼들이 회원님을 어떻게 부를까요?",
            icon: "👤"
        },
        {
            title: "프로필 사진",
            description: "프로필 사진을 설정해보세요 (선택사항)",
            icon: "📸"
        },
        {
            title: "자기소개",
            description: "회원님을 표현할 수 있는 자기소개를 작성해주세요",
            icon: "✍️"
        },
        {
            title: `환영합니다. ${onboardingUserInfo.nickname} 님!`,
            description: "모든 준비가 완료되었습니다",
            icon: "🎉"
        }
    ];

    const handleInputChange = (field: keyof UserInfo, value: string) => {
        setOnboardingUserInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleInputChange('photo', e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = async () => {
        await updateUserInfo.mutateAsync({
            ...onboardingUserInfo,
            isOnboardingDone: true
        });

        // 사용자 정보를 다시 가져온다.
        await refetchUserInfo();

        // 페이지를 이동한다.
        navigate(PATH.INDEX, { replace: true });
    };

    const canProceed = () => {
        switch (currentStep) {
            case 0:
                return onboardingUserInfo.nickname.trim().length >= 2;
            case 1:
                return true; // 프로필 사진은 선택사항
            case 2:
                return onboardingUserInfo.introduction.trim().length >= 10;
            case 3:
                return true;
            default:
                return false;
        }
    };

    const progressPercentage = ((currentStep + 1) / onboardingSteps.length) * 100;
    const currentStepData = onboardingSteps[currentStep];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Styled.FormContainer>
                        <Styled.FormGroup>
                            <Styled.Label htmlFor="nickname">닉네임</Styled.Label>
                            <Styled.Input
                                id="nickname"
                                type="text"
                                placeholder="2글자 이상 입력해주세요"
                                value={onboardingUserInfo?.nickname}
                                onChange={(e) => handleInputChange('nickname', e.target.value)}
                                maxLength={20}
                            />
                            <div style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.25rem' }}>
                                {onboardingUserInfo?.nickname.length}/20글자
                            </div>
                        </Styled.FormGroup>
                    </Styled.FormContainer>
                );

            case 1:
                return (
                    <Styled.FormContainer>
                        <Styled.PhotoUploadContainer>
                            {onboardingUserInfo.photo ? (
                                <Styled.PhotoPreviewImage 
                                    src={onboardingUserInfo.photo}
                                    alt="프로필 사진" 
                                    onClick={() => fileInputRef.current?.click()}
                                />
                            ) : (
                                <Styled.PhotoPreview onClick={() => fileInputRef.current?.click()}>
                                    📸
                                </Styled.PhotoPreview>
                            )}
                            <Styled.UploadButton onClick={() => fileInputRef.current?.click()}>
                                {onboardingUserInfo.photo ? '사진 변경' : '사진 업로드'}
                            </Styled.UploadButton>
                            <Styled.HiddenFileInput
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                        </Styled.PhotoUploadContainer>
                    </Styled.FormContainer>
                );

            case 2:
                return (
                    <Styled.FormContainer>
                        <Styled.FormGroup>
                            <Styled.Label htmlFor="introduction">자기소개</Styled.Label>
                            <Styled.Textarea
                                id="introduction"
                                placeholder="파크골프에 대한 열정이나 목표를 간단히 소개해주세요 (최소 10글자)"
                                value={onboardingUserInfo.introduction}
                                onChange={(e) => handleInputChange('introduction', e.target.value)}
                                maxLength={200}
                            />
                            <div style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.25rem' }}>
                                {onboardingUserInfo.introduction.length}/200글자
                            </div>
                        </Styled.FormGroup>
                    </Styled.FormContainer>
                );

            case 3:
                return (
                    <Styled.FormContainer>
                        <div style={{ textAlign: 'center', color: '#4a5568' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                {onboardingUserInfo.photo && (
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <Styled.PhotoPreviewImage 
                                            src={onboardingUserInfo.photo}
                                            alt="프로필 사진"
                                            style={{ width: '80px', height: '80px' }}
                                        />
                                    </div>
                                )}
                                <div style={{ fontSize: '0.9rem', color: '#718096' }}>
                                    {onboardingUserInfo.introduction}
                                </div>
                            </div>

                            <br/>
                            <br/>
                            <p>이제 위드파크에서 파크골프를 더욱 즐겁게 경험해보세요!</p>
                        </div>
                    </Styled.FormContainer>
                );

            default:
                return null;
        }
    };

    if(isUserInfoLoading) {
        return <></>;
    }

    return (
        <Styled.Container>
            <Card padding={'3rem'}>
                <Styled.StepTitle>{currentStepData.title}</Styled.StepTitle>
                <Styled.StepDescription>{currentStepData.description}</Styled.StepDescription>

                <ProgressBar progress={progressPercentage} />

                {renderStepContent()}

                <Styled.ButtonContainer>
                    {currentStep > 0 && (
                        <Button variant={'secondary'} onClick={handlePrevious}>
                            이전
                        </Button>
                    )}
                    
                    {currentStep < onboardingSteps.length - 1 ? (
                        <Button variant={'primary'} onClick={handleNext} disabled={!canProceed()}>
                            다음
                        </Button>
                    ) : (
                        <Button variant={'primary'} onClick={handleComplete}>
                            시작하기
                        </Button>
                    )}
                </Styled.ButtonContainer>
            </Card>
        </Styled.Container>
    );
};

export default OnboardingPage;