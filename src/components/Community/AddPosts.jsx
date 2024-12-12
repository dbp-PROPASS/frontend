// AddPosts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Community/AddPosts.css';
import Cookies from 'js-cookie'; // 쿠키에서 값을 가져오기 위한 js-cookie import

const AddPosts = ({ currentCategory, setView }) => {  // props로 전달받기
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    comId: currentCategory,
  });

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

    // 카테고리 변경 시 comId 업데이트 (혹시 모를 동적 변경 대응)
    useEffect(() => {
      setFormData((prevState) => ({
        ...prevState,
        comId: currentCategory,
      }));
    }, [currentCategory]);

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 막기

    // 쿠키에서 이메일을 가져오기
    const author = Cookies.get('rememberEmail');
    if (!author) {
      alert('로그인 정보가 없습니다.'); // 쿠키에 이메일이 없으면 알림
      return;
    }

    // formData에 author 추가
    const postData = { ...formData, author };

    try {
      const response = await axios.post('http://localhost:5000/api/addPost', postData);
      alert(response.data.message); // 서버에서 받은 메시지 출력
      setFormData({ title: '', content: '', comId: currentCategory }); // 폼 초기화
      setView('list'); // 게시글 작성 후 목록 화면으로 이동
    } catch (err) {
      console.error('요청 실패:', err.response || err.message);
      alert('게시글 작성에 실패하였습니다.');
    }
  };

  return (
    <div className='AddPosts'><br></br><br></br><br></br>
    
      <h2>게시글 작성</h2>
      <div className='AddPostsMainSection'>
        <form onSubmit={handleSubmit}>
          <div className="AddPostsField">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="게시글 제목을 입력하세요"
            />
          </div>

          <div className="AddPostsField">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="게시글 내용을 입력하세요"
            />
          </div>

          {/* <div className="AddPostsField">
            <label htmlFor="author">글쓴이</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="글쓴이를 입력하세요"
            />
          </div> */}

          {/* <div className="AddPostsField">
            <label htmlFor="comId">커뮤니티 id</label>
            <input
              type="text"
              id="comId"
              name="comId"
              value={formData.comId}
              onChange={handleChange}
              required
              placeholder="커뮤니티 id를 입력하세요"
            />
          </div> */}

          <div className="AddPostsSubmit">
            <button type="submit">작성</button>
          </div>
          <div className="AddPostsBack">
            <button onClick={() => setView('list')}>이전</button> {/* 이전 버튼 추가 */}
          </div>
        </form>


      </div>
    </div>
  );
};

export default AddPosts;