import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../../styles/Login.css';
import FindPasswordModal from './FindPassword';

const Login = () => {
  const navigate = useNavigate();
  
  const handleClickforSignup = () => {
    navigate('/SignUp');
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["rememberEmail"]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  useEffect(() => {
    if (cookies.rememberEmail !== undefined) {
      setEmail(cookies.rememberEmail);
    }
  }, [cookies.rememberEmail]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      }, 
      { withCredentials: true }
    );

      if (response.data.success) {
        alert(`${response.data.message}`);
        setCookie("rememberEmail", email, { path: '/', expires: new Date(Date.now() + 604800000) });
        navigate("/")
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("네트워크 오류 발생:", error);
      setMessage("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login">
      <h2>LOGIN</h2>
      <form className="form-login" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          className="input"
          name="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input"
          name="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="loginSubmit">
          <button type="submit" onClick={handleLogin}>login</button>
        </div>
      </form>
      {message && <p className="loginMessage">{message}</p>}
      <hr />
      <div className="nav-at-login">
        <div className="nav-signup" onClick={handleClickforSignup}>회원가입</div>
        <div className="nav-find-password" onClick={() => setIsModalOpen(true)}>비밀번호 찾기</div>
      </div>
      {isModalOpen && (
        <FindPasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Login;
