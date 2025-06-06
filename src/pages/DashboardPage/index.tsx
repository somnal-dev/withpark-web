import Styled from './DashboardPage.styles';
import Card from "@withpark/ui/components/Card";
import PopularPosts from './components/PopularPosts';

// 더미 데이터
const golfCourses = [
    {id: 1, name: '서울파크골프장', distance: '2.3km'},
    {id: 2, name: '강남파크골프클럽', distance: '5.1km'},
    {id: 3, name: '한강파크골프장', distance: '7.8km'},
    {id: 4, name: '올림픽파크골프장', distance: '12.4km'},
];

const ongoingGames = [
    {
        id: 1,
        title: '주말 친선경기',
        location: '서울파크골프장',
        date: '2024년 1월 20일',
        participants: 8,
        maxParticipants: 12
    },
    {
        id: 2,
        title: '초보자 모임',
        location: '강남파크골프클럽',
        date: '2024년 1월 22일',
        participants: 4,
        maxParticipants: 8
    }
];

const DashboardPage = () => {

    return (
        <Styled.DashboardContainer>
            <Styled.MainContent>
                <Styled.GridContainer>

                    {/* 파크골프장 목록 */}
                    <Card title={'🏌️ 근처 파크골프장'}>
                        {golfCourses.map((course) => (
                            <Styled.GolfCourseItem key={course.id}>
                                <Styled.GolfCourseName>{course.name}</Styled.GolfCourseName>
                                <Styled.Distance>{course.distance}</Styled.Distance>
                            </Styled.GolfCourseItem>
                        ))}
                    </Card>

                    {/* 인기 게시글 */}
                    <PopularPosts />

                    {/* 진행중인 게임 */}
                    {/*<Card title={'⛳ 진행중인 게임'}>*/}
                    {/*    {ongoingGames.map((game) => (*/}
                    {/*        <Styled.GameInfo key={game.id}>*/}
                    {/*            <Styled.GameTitle>{game.title}</Styled.GameTitle>*/}
                    {/*            <Styled.GameDetail>*/}
                    {/*                📍 {game.location}<br/>*/}
                    {/*                📅 {game.date}<br/>*/}
                    {/*                👥 {game.participants}/{game.maxParticipants}명 참여*/}
                    {/*            </Styled.GameDetail>*/}
                    {/*        </Styled.GameInfo>*/}
                    {/*    ))}*/}
                    {/*</Card>*/}
                </Styled.GridContainer>
            </Styled.MainContent>
        </Styled.DashboardContainer>
    );
};

export default DashboardPage; 