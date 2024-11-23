import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/FindPassword.css'; // 비밀번호 찾기 전용 스타일을 추가하거나 수정하세요.

const FindPassword = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
      
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

    alert(`이름: ${name}\n이메일: ${email}\n전화번호: ${phone}\n\n다음과 같은 정보로 비밀번호 찾기를 진행할까요?`);
  };

  const handleGoToLogin = () => {
    navigate('/Login');  
  };

  return (
    <div className='findPassword'>
       <h2>비밀번호 찾기</h2>
        <div className='findPasswordMainSection'>
          <form onSubmit={handleSubmit}>
            <div className="findPasswordField">
              <p>이름</p>
              <p> | </p>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="findPasswordField">
              <p>EMAIL</p>
              <p> | </p>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="findPasswordField">
              <p>전화번호</p>
              <p> | </p>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
            </div>
            <div className="findPasswordSubmit">
              <button type="submit">비밀번호 찾기</button>
            </div>
          </form>
          <div className='outputField'>
            <button onClick={handleGoToLogin}>로그인 화면으로 돌아가기</button>
          </div>
        </div>
    </div>
  );
};

export default FindPassword; 