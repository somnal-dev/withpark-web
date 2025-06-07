import styled from '@emotion/styled';

const Styled = {
  Container: styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  `,

  BackButton: styled.div`
    margin-bottom: 24px;
  `,

  PostContent: styled.div`
    padding: 24px;
  `,

  AuthorInfo: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  `,

  AuthorPhoto: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
  `,

  AuthorName: styled.div`
    font-weight: bold;
    font-size: 16px;
  `,

  PostDate: styled.div`
    font-size: 14px;
    color: #666;
  `,

  PostTitle: styled.h1`
    margin: 0 0 16px 0;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.3;
  `,

  PostBody: styled.div`
    margin: 0 0 20px 0;
    color: #333;
    line-height: 1.6;
    font-size: 16px;
    white-space: pre-wrap;
  `,

  PostImage: styled.img`
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 20px;
  `,

  ActionsContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-top: 1px solid #eee;
  `,

  LeftActions: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
  `,

  LikeButton: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
  `,

  CommentInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #666;
  `,

  ViewCount: styled.div`
    font-size: 14px;
    color: #666;
  `,

  CommentSection: styled.div`
    margin-top: 32px;
  `,

  LoadingContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    color: #666;
  `,

  ErrorContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    color: #666;
    gap: 16px;
  `,
};

export default Styled; 