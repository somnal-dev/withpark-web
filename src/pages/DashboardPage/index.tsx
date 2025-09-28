import Styled from "./DashboardPage.styles";
import PopularPlaces from "./components/PopularPlaces";

const DashboardPage = () => {
  return (
    <Styled.DashboardContainer>
      <Styled.MainContent>
        <Styled.GridContainer>
          {/* 인기 파크골프장 */}
          <PopularPlaces />

          {/* 인기 게시글 */}
          {/* <PopularPosts /> */}
        </Styled.GridContainer>
      </Styled.MainContent>
    </Styled.DashboardContainer>
  );
};

export default DashboardPage;
