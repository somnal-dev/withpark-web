import styled from "@emotion/styled";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

const GolfCourseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: #f7fafc;
  margin-bottom: 0.5rem;
  
  &:hover {
    background-color: #edf2f7;
    cursor: pointer;
  }
`;

const GolfCourseName = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

const Distance = styled.span`
  color: #718096;
  font-size: 0.875rem;
`;

const PopularPost = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  
  &:hover {
    background-color: #f7fafc;
    cursor: pointer;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const PostTitle = styled.div`
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const PostMeta = styled.div`
  font-size: 0.75rem;
  color: #718096;
`;

const GameInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
`;

const GameTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const GameDetail = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

export default {
    DashboardContainer,
    MainContent,
    PageTitle,
    GridContainer,
    GolfCourseItem,
    GolfCourseName,
    Distance,
    PopularPost,
    PostTitle,
    PostMeta,
    GameInfo,
    GameTitle,
    GameDetail,
}