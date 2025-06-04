import styled from "@emotion/styled";

const StepIndicator = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
`;

const StepDot = styled.div<{ active: boolean; completed: boolean }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props: { active: boolean; completed: boolean }) =>
    props.completed ? '#4A7C59' :
        props.active ? '#2D5016' : '#e2e8f0'
};
    transition: all 0.3s ease;
`;

export default {
    StepIndicator,
    StepDot
}