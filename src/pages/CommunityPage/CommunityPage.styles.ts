import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    max-width: 800px;
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
    color: #333;
  `,

  SearchContainer: styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  `,

  SearchInputContainer: styled.div`
    flex: 1;
    min-width: 200px;
    display: flex;
    gap: 8px;
  `,

  SearchResultInfo: styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 16px;
  `,

  FormContainer: styled.div`
    margin-bottom: 24px;
  `,

  LoadingContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #666;
  `,

  ErrorContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    color: #666;
  `,

  PostList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,

  PostContainer: styled.div`
    position: relative;
  `,

  CommentContainer: styled.div`
    margin-top: 16px;
  `,

  EmptyState: styled.div`
    text-align: center;
    color: #666;
    padding: 60px 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  `,

  EmptyStateTitle: styled.div`
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: 500;
  `,

  EmptyStateDescription: styled.div`
    font-size: 14px;
    margin-bottom: 16px;
  `,

  PaginationContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 24px 0;
    flex-wrap: wrap;
  `,

  PaginationButton: styled.button<{ active?: boolean }>`
    min-width: 40px;
    height: 40px;
    border: 1px solid ${props => props.active ? '#007bff' : '#ddd'};
    background-color: ${props => props.active ? '#007bff' : 'white'};
    color: ${props => props.active ? 'white' : '#333'};
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background-color: ${props => props.active ? '#0056b3' : '#f8f9fa'};
      border-color: ${props => props.active ? '#0056b3' : '#adb5bd'};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:focus {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }
  `,
};

export default Styled; 