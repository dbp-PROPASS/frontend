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

  const [selectedInterests, setSelectedInterests] = useState([]);

  // 관심분야 선택 핸들러
  const handleInterestSelect = (e) => {
    const value = e.target.value;

    if (value && !selectedInterests.includes(value)) {
      if (selectedInterests.length < 3) {
        setSelectedInterests((prev) => [...prev, value]);
      } else {
        alert('최대 3개까지 선택 가능합니다.');
      }
    }
  };

  // 관심분야 삭제 핸들러
  const handleInterestRemove = (value) => {
    setSelectedInterests((prev) => prev.filter((interest) => interest !== value));
  };

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
  
    // 관심분야를 formData에 포함
    const submissionData = {
      ...formData,
      interests: selectedInterests.join(', '), // 선택한 관심분야를 쉼표로 구분한 문자열로 변환
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/signup', submissionData);
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
            <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
          </div>
          <div className="signUpField">
            <p>PASSWORD</p>
            <p> | </p>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
          </div>
          <div className="signUpField">
            <p>EMAIL</p>
            <p> | </p>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
            <button type="button">인증 받기</button>
          </div>
          <div className="signUpField">
            <p>전화번호</p>
            <p> | </p>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange}/>
            <button type="button">인증 받기</button>
          </div>
          <div className="signUpField">
            <p>연령대</p>
            <p> | </p>
            <input type="text" name="age_group" value={formData.age_group} onChange={handleChange}/>
          </div>
          <div className="signUpField">
            <p>관심분야</p>
            <p> | </p>
            <div className="signUpselectWrapper">
              <select name="interests" onChange={handleInterestSelect}>
                <option value="">선택하세요 ▼</option>
                <option value="a">IT/컴퓨터</option>
                <option value="b">어학</option>
                <option value="경영/회계/금융">경영/회계/금융</option>
                <option value="건축/토목/기술">건축/토목/기술</option>
                <option value="e">의료/보건</option>
                <option value="f">교육/상담</option>
                <option value="g">공예/디자인</option>
                <option value="h">조리/식음료</option>
                <option value="i">운전/기계</option>
                <option value="국가 자격증">국가 자격증</option>
              </select>
            </div>
            <div className="selectedInterests">
              {selectedInterests.map((interest, index) => (
                <span key={index} className="interestItem">
                  {interest} 
                  <button className="interestItem" type="button" onClick={() => handleInterestRemove(interest)}> x</button>
                </span>
              ))}
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
