import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "@withpark/ui/components/Button";
import Input from "@withpark/ui/components/Input";
import usePosts from "../../api/queries/usePosts";
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";

const CommunityPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [actualSearchQuery, setActualSearchQuery] = useState('');

  const { data: postsData, isLoading, error } = usePosts({
    page: currentPage,
    limit: 10,
    search: actualSearchQuery,
  });

  const handleSearch = () => {
    setActualSearchQuery(searchQuery);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostClick = (postId: number) => {
    navigate(`/community/${postId}`);
  };

  const renderPagination = () => {
    if (!postsData || postsData.totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(postsData.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "primary" : "secondary"}
          onClick={() => handlePageChange(i)}
          style={{ minWidth: '40px' }}
        >
          {i}
        </Button>
      );
    }

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '8px', 
        margin: '24px 0',
        flexWrap: 'wrap'
      }}>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          처음
        </Button>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!postsData.hasPrev}
        >
          이전
        </Button>
        {pages}
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!postsData.hasNext}
        >
          다음
        </Button>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(postsData.totalPages)}
          disabled={currentPage === postsData.totalPages}
        >
          마지막
        </Button>
      </div>
    );
  };

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: '#666'
      }}>
        게시글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
          커뮤니티
        </h1>
        
        {/* 검색 및 작성 버튼 */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', gap: '8px' }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              placeholder="게시글을 검색해보세요..."
              style={{ flex: 1 }}
            />
            <Button variant="secondary" onClick={handleSearch}>
              검색
            </Button>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowPostForm(!showPostForm)}
          >
            {showPostForm ? '취소' : '글쓰기'}
          </Button>
        </div>

        {/* 검색 결과 정보 */}
        {actualSearchQuery && (
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            '{actualSearchQuery}' 검색 결과: {postsData?.totalCount || 0}개
            {postsData?.totalCount > 0 && (
              <Button
                variant="secondary"
                onClick={() => {
                  setActualSearchQuery('');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                style={{ marginLeft: '8px', fontSize: '12px', padding: '4px 8px' }}
              >
                검색 초기화
              </Button>
            )}
          </div>
        )}
      </div>

      {/* 게시글 작성 폼 */}
      {showPostForm && (
        <div style={{ marginBottom: '24px' }}>
          <PostForm
            onClose={() => setShowPostForm(false)}
            onSuccess={() => {
              setShowPostForm(false);
              setCurrentPage(1); // 새 게시글 작성 후 첫 페이지로 이동
            }}
          />
        </div>
      )}

      {/* 로딩 상태 */}
      {isLoading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px',
          color: '#666'
        }}>
          게시글을 불러오는 중...
        </div>
      ) : (
        <>
          {/* 게시글 목록 */}
          {postsData?.posts && postsData.posts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {postsData.posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onPostClick={handlePostClick}
                />
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#666', 
              padding: '60px 20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px'
            }}>
              {actualSearchQuery ? (
                <>
                  <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                    검색 결과가 없습니다
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    다른 키워드로 검색해보세요
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                    아직 게시글이 없습니다
                  </div>
                  <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                    첫 번째 게시글을 작성해보세요!
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => setShowPostForm(true)}
                  >
                    글쓰기
                  </Button>
                </>
              )}
            </div>
          )}

          {/* 페이지네이션 */}
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default CommunityPage;