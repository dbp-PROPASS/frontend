import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    age_group: '',
    interests: '',
    notification: 'N',
  });

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? (checked ? 'Y' : 'N') : value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 막기

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      alert(response.data.message); // 서버에서 받은 메시지 출력
    } catch (err) {
      console.error(err);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='signUp'>
      <h2>SIGN UP</h2>
      <div className='signUpMainSection'>
        <form onSubmit={handleSubmit}>
          <div className="signUpField">
            <p>이름</p>
            <p> | </p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signUpField">
            <p>PASSWORD</p>
            <p> | </p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signUpField">
            <p>EMAIL</p>
            <p> | </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="button">인증 받기</button>
          </div>
          <div className="signUpField">
            <p>전화번호</p>
            <p> | </p>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <button type="button">인증 받기</button>
          </div>
          <div className="signUpField">
            <p>연령대</p>
            <p> | </p>
            <input
              type="text"
              name="age_group"
              value={formData.age_group}
              onChange={handleChange}
            />
          </div>
          <div className="signUpField">
            <p>관심분야</p>
            <p> | </p>
            <div className="signUpselectWrapper">
              <select
                name="interests"
                value={formData.interests}
                onChange={handleChange}
              >
                <option value="">선택하세요 ▼</option>
                <option value="eng">eng</option>
                <option value="tech">tech</option>
              </select>
            </div>
            <div className="signUpAlarm">
              <p>알림 수신 동의</p>
              <label className="toggleSwitch">
                <input
                  type="checkbox"
                  name="notification"
                  checked={formData.notification === 'Y'} // Y일 경우 체크된 상태
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="signUpSubmit">
            <button type="submit">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
