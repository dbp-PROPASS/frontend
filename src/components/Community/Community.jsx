// Community.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Community/Community.css';
import AddPosts from './AddPosts'; // AddPosts 컴포넌트 임포트
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import LargeAdBanner from './LargeAdBanner';
import messagesByPrice from './messages';

const Community = () => {
  const [view, setView] = useState('list'); // List/Write/Detail 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [category, setCategory] = useState('business'); // 현재 선택된 카테고리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsData, setPostsData] = useState([]); // API에서 가져온 데이터
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글
  const [newComment, setNewComment] = useState(''); // 댓글 입력내용 저장
  const [showPopup, setShowPopup] = useState(() => !localStorage.getItem('adPopupClosed')); // 광고 팝업 상태
  const [commentCount, setCommentCount] = useState(0);  // 댓글 개수 상태
  const [points, setPoints] = useState(0);  // 포인트 상태
  const [popupMessage, setPopupMessage] = useState(null); // 상품 구매 팝업 메시지 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);  // 상품 구매 팝업창 상태

  const postsPerPage = 8; // 페이지당 게시글 수
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = Cookies.get('rememberEmail'); // 쿠키에서 토큰 가져오기

    if (!sessionToken) {
      alert("로그인이 필요합니다.");
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const author = Cookies.get('rememberEmail');  // 로그인한 사용자의 이메일

        if (!author) {
          alert('로그인 정보가 없습니다.');
          navigate('/login');
          return;
        }

        // API에서 댓글 개수 가져오기
        const response = await axios.get('http://localhost:5000/api/comments/count', {
          params: { author },
        });

        const count = response.data.count;  // 댓글 개수
        setCommentCount(count);
        setPoints(count);  // 댓글 개수에 맞춰 포인트 설정 (예: 댓글 1개당 1포인트)
      } catch (error) {
        console.error('댓글 개수 가져오기 실패:', error);
      }
    };

    fetchCommentCount();
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

  // 광고 팝업 렌더링 함수
  const renderAdPopup = () => (
    showPopup && (
      <div className="popup-overlay">
        <div className="popup">
          <h2>광고</h2>
          <p>
            토익1타 방학강좌 수강료 최대 35% 지원
            <br />
            지금 할인받고 수강하기
            <br />
            ▼▼▼▼▼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <div className="popup-buttons">
            <button
              onClick={() => window.open('https://www.hackers.co.kr/', '_blank')}
            >
              지금 바로 이동
            </button>
            <button
              onClick={() => {
                localStorage.setItem('adPopupClosed', 'true'); // Set the flag in localStorage
                setShowPopup(false); // Hide the popup
              }}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    )
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(postsData.length / postsPerPage);
  const paginatedPosts = postsData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // 상품 구매 핸들러
  const handlePurchase = (product) => {
    if (points >= product.price) {
      // 포인트 차감
      setPoints((prevPoints) => prevPoints - product.price);

      // 랜덤 메시지 선택 (해당 가격의 메시지 중 하나)
      const randomMessage = messagesByPrice[product.price]?.[
        Math.floor(Math.random() * messagesByPrice[product.price].length)
      ];

      setPopupMessage(randomMessage || "감사합니다! 좋은 하루 보내세요!"); // 메시지 저장
      setIsPopupOpen(true); // 팝업창 열기
    } else {
      alert("포인트가 부족합니다.");
    }
  };

  // 상품 구매 팝업 컴포넌트
  const PurchasePopup = ({ message, onClose }) => (
    <div className="popup-overlay">
      <div className="popup">
        <h2>💯 오늘도 파이팅! 😄</h2>
        <p>{message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );

  const closePopup = () => {
    setIsPopupOpen(false); // 팝업창 닫기
  };

  const renderPurchaseSection = () => (
    <div className="purchase-section">
      <h3>포인트 쇼핑</h3>
      <ul className="product-list">
        {[
          { id: 1, name: "오늘의 운세", price: 5 },
          { id: 2, name: "오늘의 공부법", price: 10 },
          { id: 3, name: "인생의 꿀팁", price: 15 },
        ].map((product) => (
          <li key={product.id} className="product-item">
            <span>{product.name}</span>
            <span>{product.price} 포인트</span>
            <button onClick={() => handlePurchase(product)}>구매하기</button>
          </li>
        ))}
      </ul>
    </div>
  );

  // 목록 화면 렌더링
  const renderListView = () => (
    <div className="post-list-container"><br /><br /><br /><br /><br /><br />
      {renderAdPopup()} {/* 광고 팝업 조건부 렌더링 */}

      <div className="category-select">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="category-dropdown"
        >
          <option value="business">경영·사무·금융 분야</option>
          <option value="public">교육·법률·공공 분야</option>
          <option value="health">보건·안전 분야</option>
          <option value="culture">문화·여가·서비스 분야</option>
          <option value="logistics">운전·운송·경비 분야</option>
          <option value="industry">건설·기계·자원 분야</option>
          <option value="manufacturing">화학·섬유·제조 분야</option>
          <option value="technology">전기·전자·정보통신 분야</option>
          <option value="food">식품·가공 분야</option>
          <option value="environment">농림·환경·에너지 분야</option>
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
        <div className="nav-Posts" onClick={() => setView('write')}>
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
              <tr
                key={post.postId}
                onClick={() => {
                  setView('detail');
                  setSelectedPost(post);
                }}
              >
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

      {renderPurchaseSection()} {/* 상품 구매 섹션 */}
      <div className="points-display">
        <span>내 포인트: {points}</span>
        <span> (댓글 1개당 1포인트)</span>
      </div>
      <LargeAdBanner />

      {isPopupOpen && <PurchasePopup message={popupMessage} onClose={closePopup} />} {/* 상품 구매 팝업 */}
    </div>
  );

  // 댓글 작성 핸들러 추가
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력하세요.');
      return;
    }

    // 쿠키에서 이메일을 가져오기
    const author = Cookies.get('rememberEmail');
    if (!author) {
      alert('로그인 정보가 없습니다.'); // 쿠키에 이메일이 없으면 알림
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${selectedPost.postId}/comments`, {
        content: newComment,
        author: author,
      });

      // 서버 응답에서 새로운 댓글 데이터를 받아와 상태 업데이트
      const newCommentData = response.data;

      // 선택된 게시글 상태 업데이트
      setSelectedPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newCommentData],
      }));

      // 댓글 작성 후 입력 필드 초기화
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const renderDetailView = () => (
    <div className="post-detail"><br /><br /><br />
      {/* 기존 상세보기 UI */}
      <h2 className="post-title">{selectedPost.title}</h2>
      <p className="post-author"><strong></strong> {selectedPost.author}</p>
      <p>{selectedPost.content}</p>

      <div className="comments-section">
        <h3 className="post-comment-name">댓글</h3>
        {selectedPost.comments.length > 0 ? (
          <ul>
            {selectedPost.comments.map((comment) => (
              <li key={comment.commentId}>
                <strong>{comment.author}</strong>: {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>댓글이 없습니다.</p>
        )}
        <div className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="작성한 글들은 정보 공유를 위해 삭제가 불가능하니, 신중하게 작성하시길 바랍니다."
          />
          <button onClick={handleCommentSubmit}>댓글 작성</button>
        </div>
      </div>

      <button
        onClick={() => {
          setView('list'); // 상태를 먼저 변경
          window.location.reload(); // 페이지 새로고침
        }}
      >
        목록으로
      </button>


      <LargeAdBanner />
    </div>
  );

  const categoryMap = {
    business: '2',
    public: '3',
    health: '4',
    culture: '5',
    logistics: '6',
    industry: '7',
    manufacturing: '8',
    technology: '9',
    food: '10',
    environment: '11',
  };

  return view === 'list'
    ? renderListView()
    : view === 'write'
    ? <AddPosts currentCategory={categoryMap[category]} setView={setView} />
    : view === 'detail'
    ? renderDetailView()
    : null;
};

export default Community;
