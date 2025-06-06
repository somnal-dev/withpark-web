import styled from '@emotion/styled';

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
        case 'small':
            return { width: '80px', height: '80px', fontSize: '2rem' };
        case 'large':
            return { width: '160px', height: '160px', fontSize: '4rem' };
        default: // medium
            return { width: '120px', height: '120px', fontSize: '3rem' };
    }
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const ImagePreview = styled.img<{ size: 'small' | 'medium' | 'large'; isUploading?: boolean }>`
    ${props => {
        const { width, height } = getSizeStyles(props.size);
        return `
            width: ${width};
            height: ${height};
        `;
    }}
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #4A7C59;
    cursor: ${props => props.isUploading ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease;
    opacity: ${props => props.isUploading ? 0.7 : 1};
    filter: ${props => props.isUploading ? 'blur(1px)' : 'none'};
    
    &:hover {
        border-color: ${props => props.isUploading ? '#4A7C59' : '#2D5016'};
        transform: ${props => props.isUploading ? 'none' : 'scale(1.05)'};
    }
`;

const Placeholder = styled.div<{ size: 'small' | 'medium' | 'large'; isUploading?: boolean }>`
    ${props => {
        const { width, height, fontSize } = getSizeStyles(props.size);
        return `
            width: ${width};
            height: ${height};
            font-size: ${fontSize};
        `;
    }}
    border-radius: 50%;
    background: #f7fafc;
    border: 3px dashed #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a0aec0;
    cursor: ${props => props.isUploading ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease;
    opacity: ${props => props.isUploading ? 0.7 : 1};
    
    &:hover {
        border-color: ${props => props.isUploading ? '#e2e8f0' : '#4A7C59'};
        background: ${props => props.isUploading ? '#f7fafc' : '#edf2f7'};
        color: ${props => props.isUploading ? '#a0aec0' : '#4A7C59'};
    }
`;

const UploadButton = styled.button<{ disabled?: boolean }>`
    background: ${props => props.disabled ? '#f7fafc' : '#f7fafc'};
    color: ${props => props.disabled ? '#a0aec0' : '#4a5568'};
    border: 2px solid ${props => props.disabled ? '#e2e8f0' : '#e2e8f0'};
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.3s ease;
    opacity: ${props => props.disabled ? 0.6 : 1};
    
    &:hover {
        background: ${props => props.disabled ? '#f7fafc' : '#edf2f7'};
        border-color: ${props => props.disabled ? '#e2e8f0' : '#cbd5e0'};
        color: ${props => props.disabled ? '#a0aec0' : '#2d3748'};
    }
    
    &:active {
        transform: ${props => props.disabled ? 'none' : 'scale(0.98)'};
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

export default {
    Container,
    ImagePreview,
    Placeholder,
    UploadButton,
    HiddenFileInput,
}; 