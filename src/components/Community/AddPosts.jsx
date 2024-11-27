import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Community/AddPosts.css';

const AddPosts = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    comId: '',
  });

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 막기

    try {
      const response = await axios.post('http://localhost:5000/api/AddPosts', formData);
      alert(response.data.message); // 서버에서 받은 메시지 출력
    } catch (err) {
      console.error(err);
      alert('게시글 작성에 실패하였습니다.');
    }
  };

  return (
    <div className='AddPosts'><br></br><br></br><br></br><br></br><br></br><br></br>
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

          <div className="AddPostsField">
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
          </div>

          <div className="AddPostsField">
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
          </div>

          <div className="AddPostsSubmit">
            <button type="submit">add Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPosts;
