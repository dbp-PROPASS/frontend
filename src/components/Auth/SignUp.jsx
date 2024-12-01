import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/SignUp.css';
import { interestsOptions } from '../../data/interestsOptions';  // 데이터 import

const SignUp = () => {
  const navigate = useNavigate();

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isCodeCorrect, setIsCodeCorrect] = useState(null);

  const handleEditClick = async () => {
    try {
      await axios.post("http://localhost:5000/api/email/send-code", {
        email: formData.email,
      });
      setIsModalOpen(true);
    } catch (error) {
      alert("이메일 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleVerificationSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/email/verify-code",
        { code: enteredCode }
      );
      //alert(response.data.message);
      setIsCodeCorrect(true);
    } catch (error) {
      //alert("인증코드가 일치하지 않습니다.");
      setIsCodeCorrect(false);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 막기
    
    // 인증 코드가 맞지 않거나, 인증 코드가 입력되지 않은 경우 제출하지 않음
    if (isCodeCorrect !== true) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    // 관심분야를 formData에 포함
    const submissionData = {
      ...formData,
      interests: selectedInterests.join(', '), // 선택한 관심분야를 쉼표로 구분한 문자열로 변환
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/signup', submissionData);
      alert(response.data.message); // 서버에서 받은 메시지 출력
      navigate('/login')
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
            <button type="button" onClick={() => handleEditClick()}>인증 받기</button>
          </div>
          <div className="signUpField">
            <p>전화번호</p>
            <p> | </p>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="ex) 010-xxxx-xxxx"/>
            <button type="button">인증 받기</button>
          </div>
          <div className="signUpField">
            <p>연령대</p>
            <p> | </p>
            <input type="text" name="age_group" value={formData.age_group} onChange={handleChange} placeholder="ex) 22세 → 20"/>
          </div>
          <div className="signUpField">
            <p>관심분야</p>
            <p> | </p>
            <div className="signUpselectWrapper">
              <select name="interests" onChange={handleInterestSelect}>
                <option value="">선택하세요 ▼</option>
                {interestsOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
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

      {isModalOpen && (
        <div className="signup-modal">
          <div className="signup-modalContent">  
            <h2>이메일 인증</h2>
            <h5>{formData.email}로 인증코드를 발송했습니다.</h5>
            <input 
              type="text" 
              value={enteredCode} 
              onChange={(e) => setEnteredCode(e.target.value)} 
              placeholder="인증코드 입력"
            />
            {isCodeCorrect === false && <h5 style={{ color: 'red' }}>인증코드가 일치하지 않습니다.</h5>}
            {isCodeCorrect === true && <h5 style={{ color: 'green' }}>인증 성공!</h5>}
            <div className="signup-modalButtons">
              <button onClick={handleVerificationSubmit}>확인</button>
              <button onClick={handleModalClose}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
