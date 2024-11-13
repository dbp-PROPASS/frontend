import React, { useState } from 'react';
import '../../styles/Community/Community.css';

const Community = () => {
  const [view, setView] = useState('list'); // State to toggle between list and detail view
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [category, setCategory] = useState('it'); // State for selected category
  const [currentPage, setCurrentPage] = useState(1); // State for pagination

  // 게시글과 댓글 데이터 통합
  const postsData = {
    it: [
      { id: 100, title: '정보처리기사 후기', author: '멜론', views: 11, 
        content: '생각보다 간단했습니다. 내가 왜 5개월 동안 준비했나 싶을 정도로... 짧은 기간안에 합격한 분들 글 많을 수 있을 거예요. 그거 참고해서 열심히 하시면 충분히 가능합니다.',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
          { author: '두유', text: '맞아요... 저는 6달 준비했습니다. 한달만에 가능.' },
          { author: '말미잘', text: '정처기 열심히 준비해볼게요!' },
          // 추가 댓글 ...
          { author: '게살', text: '정처기 저도 준비해볼게요!' },
          { author: '꽃게', text: '정처기 빠이팅넘치게 준비해볼게요!' },
          { author: '미역', text: '정처기 호이호이 준비해볼게요!' },
          { author: '우럭', text: '정처기 캬 준비해볼게요!' },
          { author: '립밤', text: '정처기 부르릉 준비해볼게요!' },
          { author: '베개', text: '정처기 퉤 준비해볼게요!' },
          { author: '옷', text: '정처기 카아악 준비해볼게요!' },
          { author: '전기', text: '정처기 큐 준비해볼게요!' },    
        ]
      },
      { id: 99, title: 'SQLD 후기', author: '베이스', views: 32,
        content: 'SQLD 시험에 대한 솔직한 후기를 남겨봅니다...',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
          { author: '두유', text: '맞아요... 저는 6달 준비했습니다. 한달만에 가능.' },
          { author: '말미잘', text: 'sqld 열심히 준비해볼게요!' },
          // 추가 댓글 ...
          { author: '게살', text: 'sqld 저도 준비해볼게요!' },
          { author: '꽃게', text: 'sqld 빠이팅넘치게 준비해볼게요!' },
          { author: '미역', text: 'sqld 호이호이 준비해볼게요!' },
          { author: '우럭', text: 'sqld 캬 준비해볼게요!' },
          { author: '립밤', text: 'sqld 부르릉 준비해볼게요!' },
          { author: '베개', text: 'sqld 퉤 준비해볼게요!' },
          { author: '옷', text: 'sqld 카아악 준비해볼게요!' },
          { author: '전기', text: 'sqld 큐 준비해볼게요!' },    
        ]
      },
      // 다른 IT 게시글 ...
      { id: 98, title: 'SQLD 솔직한 후기', author: '망고', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 97, title: 'SQLD 솔직한 후기', author: '수박', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 96, title: 'SQLD 솔직한 후기', author: '보컬', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 95, title: 'SQLD 솔직한 후기', author: '살구', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 94, title: 'SQLD 솔직한 후기', author: '토마토', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 93, title: 'SQLD 솔직한 후기', author: '사과', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 92, title: 'SQLD 솔직한 후기', author: '참외', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 91, title: 'SQLD 솔직한 후기', author: '감귤', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 90, title: 'SQLD 솔직한 후기', author: '고등어', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
      { id: 89, title: 'SQLD 솔직한 후기', author: '랍스타', views: 32,
        content: 'SQLD 솔직한 후기',
        comments: [
          { author: '콩', text: '헉 감사합니다!!!' },
        ]
      },
    ],
    english: [
      { id: 200, title: '영어공부 후기', author: '사과', views: 45,
        content: '영어공부에 대한 후기입니다...',
        comments: [
          { author: '바나나', text: '영어는 꾸준히 해야죠!' },
          { author: '체리', text: '토익 800 도전할게요!' },
          // 추가 댓글 ...
        ]
      },
      // 다른 영어 게시글 ...
    ],
    finance: [
      { id: 300, title: '재무관리 합격 후기', author: '수박', views: 92,
        content: '재무관리 합격에 대한 후기입니다...',
        comments: [
          { author: '멜론', text: '재무관리 어렵던데 대단하시네요!' },
          { author: '바나나', text: '저도 도전해볼게요!' },
          // 추가 댓글 ...
        ]
      },
      // 다른 금융 게시글 ...
    ],
  };

  // 대소문자, 띄어쓰기 상관없이 검색가능
  // Filtered posts based on the selected category and search term
  const filteredPosts = postsData[category].filter(post => {
    const normalizedTitle = post.title.toLowerCase().replace(/\s/g, '');
    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s/g, '');
    return normalizedTitle.includes(normalizedSearchTerm);
  });


  // Pagination 설정
  const postsPerPage = 8;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Render the list view
  const renderListView = () => (
    <div className="community">
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div className="category-select">
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setCurrentPage(1); // 카테고리가 바뀔 때 페이지를 1로 초기화
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
      <table className="post-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map(post => (
            <tr key={post.id} onClick={() => setView(post.id)}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.views}</td>
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
        {currentPage < totalPages && (
          <span onClick={() => setCurrentPage(currentPage + 1)}>다음</span>
        )}
      </div>
    </div>
  );

  // Render the detail view for a selected post
  const renderDetailView = () => {
    const post = postsData[category].find(p => p.id === view);
    return (
      <div className="community detail-view"><br></br><br></br><br></br><br></br><br></br><br></br>
        <button className="back-button" onClick={() => setView('list')}>뒤로가기</button>
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <div className="comments">
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.author}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return view === 'list' ? renderListView() : renderDetailView();
};

export default Community;
