import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleClickforSignup = () => {
      navigate('/SignUp');
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("로그인 성공!");
      } else {
        alert("로그인 실패: " + data.message);
      }
    } catch (error) {
      console.error("네트워크 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };
  
  return (
    <div className='login'>
       <h2>LOGIN</h2>
        <form className='form-login'>
            <input type="email" className="input" name="email" placeholder='EMAIL'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>
            <input type="password" className="input" name="password" placeholder='PASSWORD'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
            <div className="loginSubmit">
              <button type="submit" onClick={handleLogin}>login</button>
            </div>
        </form>
        <hr />
        <div className='nav-at-login'>
            <div className="nav-signup" onClick={handleClickforSignup}>회원가입</div>
            <div>이메일 찾기</div>
            <div>비밀번호 찾기</div>
        </div>
    </div>
  );
};

export default Login;