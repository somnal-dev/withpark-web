import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  `,

  Header: styled.div`
    margin-bottom: 24px;
  `,

  Title: styled.h1`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
  `,

  FilterContainer: styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  `,

  SearchContainer: styled.div`
    flex: 1;
    min-width: 200px;
    display: flex;
    gap: 8px;
  `,

  AreaSelect: styled.select`
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  `,

  ResultInfo: styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
  `,

  GridContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  `,

  LoadingContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #666;
  `,

  EmptyContainer: styled.div`
    text-align: center;
    color: #666;
    padding: 60px 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  `,

  EmptyTitle: styled.div`
    font-size: 18px;
    margin-bottom: 8px;
  `,

  EmptyDescription: styled.div`
    font-size: 14px;
  `,

  PaginationContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 24px 0;
    flex-wrap: wrap;
  `,

  DetailContainer: styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  `,

  BackButton: styled.div`
    margin-bottom: 24px;
  `,

  AreaBadge: styled.div`
    display: inline-block;
    background-color: #e3f2fd;
    color: #1976d2;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
  `,

  DetailTitle: styled.h1`
    margin: 0 0 16px 0;
    font-size: 28px;
    font-weight: bold;
    color: #333;
  `,

  AddressContainer: styled.div`
    font-size: 16px;
    color: #666;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  `,

  InfoContainer: styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    font-size: 15px;
    color: #555;
  `,

  StatsContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
    border-top: 1px solid #eee;
  `,

  StatItem: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #666;
  `,

  CommentSection: styled.div`
    margin-top: 32px;
  `,
};

export default Styled; 