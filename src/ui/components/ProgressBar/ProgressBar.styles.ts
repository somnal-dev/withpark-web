import styled from '@emotion/styled';
import {motion} from "framer-motion";

const ProgressBar = styled.div`
    width: 100%;
    height: 6px;
    background: #e2e8f0;
    border-radius: 3px;
    margin-bottom: 2rem;
    overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
    height: 100%;
    background: linear-gradient(135deg, #4A7C59 0%, #2D5016 100%);
    border-radius: 3px;
`;

export default {
    ProgressBar,
    ProgressFill
}