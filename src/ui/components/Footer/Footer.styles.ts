import styled from "@emotion/styled";

const Footer = styled.footer`
    background: #1a1a1a;
    color: white;
    padding: 3rem 2rem 2rem;
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
`;

const FooterSection = styled.div`
    h3 {
        color: #4A7C59;
        margin-bottom: 1rem;
    }

    p, a {
        color: #ccc;
        text-decoration: none;
        line-height: 1.6;

        &:hover {
            color: white;
        }
    }
`;

const FooterBottom = styled.div`
    border-top: 1px solid #333;
    margin-top: 2rem;
    padding-top: 2rem;
    text-align: center;
    color: #666;
`;

export default {
    Footer,
    FooterContent,
    FooterSection,
    FooterBottom,
}