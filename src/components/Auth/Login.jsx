import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleClickforSignup = () => {
      navigate('/SignUp');
  }
  
  return (
    <div className='login'>
       <h2>LOGIN</h2>
        <form className='form-login'>
            <input type="email" className="input" name="email" placeholder='EMAIL' required/>
            <input type="password" className="input" name="password" placeholder='PASSWORD' required/>
            <div className="loginSubmit">
              <button type="submit">login</button>
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