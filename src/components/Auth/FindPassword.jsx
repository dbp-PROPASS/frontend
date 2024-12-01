import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/FindPassword.css'; // 비밀번호 찾기 전용 스타일을 추가하거나 수정하세요.

const FindPassword = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isOutputVisible, setIsOutputVisible] = useState(false); // outputField 표시 여부 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
      
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;

    if (!name) {
      alert('이름을 입력해주세요');
      return;  
    }

    if (!email) {
      alert('이메일을 입력해주세요');
      return; 
    }

    if (!phone) {
      alert('전화번호를 입력해주세요');
      return; 
    }

    if (!phoneRegex.test(phone)) {
      alert('유효한 전화번호를 입력해주세요 (형식: 000-xxxx-xxxx)');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/password', {
        name,
        email,
        phone,
      });
  
      setMessage(response.data.message);
      setIsOutputVisible(true); // outputField 표시
    } catch (error) {
      setMessage('서버 오류가 발생했습니다.');
      setIsOutputVisible(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>비밀번호 찾기</h2>
        <form onSubmit={handleSubmit}>
          <div className="findPasswordField">
            이름<input
              type="text"
              placeholder="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="findPasswordField">
            이메일<input
              type="email"
              placeholder="ex) aaa@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="findPasswordField">
            전화번호<input
              type="tel"
              placeholder="ex) 010-xxxx-xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="findPasswordSubmit">
            {isOutputVisible && (
              <div className="outputField">
                <p>{message}</p>
              </div>
              )}
            {!isOutputVisible && (
              <button type="submit">비밀번호 찾기</button> /* isOutputVisible이 false일 때만 표시 */
            )}
            <button type="button" onClick={onClose}>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindPassword; 