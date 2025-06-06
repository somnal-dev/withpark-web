import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #2D5016 0%, #4A7C59 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    
    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 1rem;
    line-height: 1.2;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.1rem;
    color: #718096;
    margin-bottom: 2.5rem;
    line-height: 1.6;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 2rem;
    }
`;

const FormContainer = styled.div`
    text-align: left;
    margin-bottom: 2rem;
`;

const PhotoUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const PhotoPreview = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #f7fafc;
    border: 3px dashed #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #a0aec0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        border-color: #4A7C59;
        background: #edf2f7;
    }
`;

const PhotoPreviewImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #4A7C59;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const UploadButton = styled.button`
    background: #f7fafc;
    color: #4a5568;
    border: 2px solid #e2e8f0;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: #edf2f7;
        border-color: #cbd5e0;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const PrimaryButton = styled(motion.button)`
    background: linear-gradient(135deg, #4A7C59 0%, #2D5016 100%);
    color: white;
    border: none;
    padding: 0.875rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(74, 124, 89, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(74, 124, 89, 0.4);
    }
    
    &:active {
        transform: translateY(0);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        
        &:hover {
            transform: none;
            box-shadow: 0 4px 15px rgba(74, 124, 89, 0.3);
        }
    }
`;

const SecondaryButton = styled(motion.button)`
    background: transparent;
    color: #718096;
    border: 2px solid #e2e8f0;
    padding: 0.875rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        border-color: #4A7C59;
        color: #2D5016;
        background: #f7fafc;
    }
`;

const StepTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #2D5016;
    margin-bottom: 0.5rem;
    text-align: center;
`;

const StepDescription = styled.p`
    font-size: 1rem;
    color: #718096;
    margin-bottom: 2rem;
    text-align: center;
`;

export default {
    Container,
    Title,
    Subtitle,
    FormContainer,
    PhotoUploadContainer,
    PhotoPreview,
    PhotoPreviewImage,
    HiddenFileInput,
    UploadButton,
    ButtonContainer,
    PrimaryButton,
    SecondaryButton,
    StepTitle,
    StepDescription,
};
