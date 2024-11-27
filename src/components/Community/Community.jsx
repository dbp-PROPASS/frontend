import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Community/Community.css';
import AddPosts from './AddPosts'; // AddPosts 컴포넌트 임포트
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const [view, setView] = useState('list'); // List/Write/Detail 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [category, setCategory] = useState('it'); // 현재 선택된 카테고리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsData, setPostsData] = useState([]); // API에서 가져온 데이터
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글

  const postsPerPage = 8; // 페이지당 게시글 수
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = Cookies.get('rememberEmail'); // 쿠키에서 토큰 가져오기

    if (!sessionToken) {
      alert("로그인이 필요합니다.");
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [navigate]);
  
  // 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          params: { category },
        });
        setPostsData(response.data); // 데이터 저장
        setCurrentPage(1); // 카테고리 변경 시 페이지 초기화
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [category]); // 카테고리 변경 시 API 호출

  // 페이지네이션 계산
  const totalPages = Math.ceil(postsData.length / postsPerPage);
  const paginatedPosts = postsData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // 목록 화면 렌더링
  const renderListView = () => (
    <div className="community"><br></br><br></br><br></br><br></br><br></br><br></br>
      <div className="category-select">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="it">IT 분야</option>
          <option value="english">영어 분야</option>
          <option value="finance">금융 분야</option>
        </select>

        <input
          type="text"
          placeholder="검색할 내용을 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="nav-at-Community">
        <div className="nav-AddPosts" onClick={() => setView('write')}>
          글 작성
        </div>
      </div>

      <table className="post-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts
            .filter((post) =>
              post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
              <tr key={post.postId} onClick={() => { setView('detail'); setSelectedPost(post); }}>
                <td>{post.title}</td>
                <td>{post.author}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );

  // 상세보기 화면 렌더링
  const renderDetailView = () => (
    <div className="post-detail"><br></br><br></br><br></br><br></br><br></br><br></br>
      <h2>{selectedPost.title}</h2>
      <p><strong>작성자:</strong> {selectedPost.author}</p>
      <p>{selectedPost.content}</p>
      <button onClick={() => setView('list')}>목록으로</button>
    </div>
  );

  return view === 'list'
    ? renderListView()
    : view === 'write'
    ? <AddPosts />
    : view === 'detail'
    ? renderDetailView()
    : null;
};

export default Community;
