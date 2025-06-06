import styled from '@emotion/styled';

export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'danger';
}

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    ${props => {
        if (props.variant === 'primary') {
            return `
                background: linear-gradient(135deg, #4A7C59 0%, #2D5016 100%);
                color: white;
                
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(74, 124, 89, 0.3);
                }
            `;
        } else if (props.variant === 'danger') {
            return `
                background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
                color: white;
                
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(229, 62, 62, 0.3);
                }
            `;
        } else {
            return `
                background: transparent;
                color: #4A7C59;
                border: 2px solid #4A7C59;
                
                &:hover {
                    background: #4A7C59;
                    color: white;
                }
            `;
        }
    }}
`;

export default {
    Button
}