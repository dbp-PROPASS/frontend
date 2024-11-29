import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styles/MyPage/EditProfile.css';
import { interestsOptions } from '../../data/interestsOptions'

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    age_group: '',
    interests: [], // 관심 분야 배열
    notification: '',
  });

  const [selectedInterests, setSelectedInterests] = useState([]);

  // 관심분야 선택 핸들러
  const handleInterestSelect = (e) => {
    const value = e.target.value;
  
    if (value && !selectedInterests.includes(value)) {
      if (selectedInterests.length < 3) {
        setSelectedInterests((prev) => [...prev, value]);
        setFormData((prevState) => ({
          ...prevState,
          interests: [...prevState.interests, value], // 선택된 값 formData에도 추가
        }));
      } else {
        alert('최대 3개까지 선택 가능합니다.');
      }
    }
  };
  
  // 관심분야 삭제 핸들러
  const handleInterestRemove = (value) => {
    setSelectedInterests((prev) => prev.filter((interest) => interest !== value));
    setFormData((prevState) => ({
      ...prevState,
      interests: prevState.interests.filter((interest) => interest !== value), // 삭제된 값 formData에서도 삭제
    }));
  };  

  // 사용자 정보 가져오기 (쿠키에서)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = Cookies.get('rememberEmail');
        if (!email) throw new Error('로그인 정보가 없습니다.');
  
        const response = await axios.get(`http://localhost:5000/api/users/${email}`);
        const userData = response.data;
        setFormData({
          name: userData.name || '',
          password: userData.password || '',
          email: userData.email || '',
          phone: userData.phone || '',
          age_group: userData.age_group || '',
          interests: userData.interests ? userData.interests.split(',') : [],
          notification: userData.notification || 'N',
        });
        setSelectedInterests(userData.interests ? userData.interests.split(',') : []);
      } catch (err) {
        console.error('사용자 정보를 불러오지 못했습니다:', err);
        alert('사용자 정보를 불러오지 못했습니다.');
      }
    };
  
    fetchUserData();
  }, []);
  

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? (checked ? 'Y' : 'N') : value,
    }));
  };

  // 수정 요청 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = Cookies.get('rememberEmail'); // 쿠키에서 이메일 가져오기
      if (!email) throw new Error('로그인 정보가 없습니다.');

      await axios.put(`http://localhost:5000/api/users/${email}`, {
        ...formData,
        interests: formData.interests.join(','), // 배열을 문자열로 변환
      });

      alert('회원 정보가 성공적으로 수정되었습니다.');
    } catch (err) {
      console.error('회원 정보 수정 중 오류:', err);
      alert('회원 정보 수정에 실패했습니다.');
    }
  };

  return (
    <div className='editProfile'>
      <h2>회원 정보 수정</h2>
      <hr />
      <div className='editProfileMainSection'>
        <form onSubmit={handleSubmit}>
          <div className="editProfileField">
            <p>이름</p>
            <p> | </p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="editProfileField">
            <p>PASSWORD</p>
            <p> | </p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="새 비밀번호를 입력하세요"
            />
          </div>
          <div className="editProfileField">
            <p>EMAIL</p>
            <p> | </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일"
              disabled // 이메일은 수정 불가
            />
          </div>
          <div className="editProfileField">
            <p>전화번호</p>
            <p> | </p>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="전화번호"
            />
          </div>
          <div className="editProfileField">
            <p>연령대</p>
            <p> | </p>
            <input
              type="text"
              name="age_group"
              value={formData.age_group}
              onChange={handleChange}
              placeholder="연령대를 입력하세요"
            />
          </div>
          <div className="editProfileField">
            <p>관심분야</p>
            <p> | </p>
            <div className="editProfileselectWrapper">
              <select name="editProfileinterests" onChange={handleInterestSelect}>
                <option value="">선택하세요 ▼</option>
                {interestsOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="editProfileselectedInterests">
              {formData.interests.map((interest, index) => (
                <span key={index} className="editProfileinterestItem">
                  {interest}
                  <button type="button" onClick={() => handleInterestRemove(interest)}> x</button>
                </span>
              ))}
            </div>
            <div className="editProfileAlarm">
            <p>알림 수신 동의</p>
            <label className="toggleSwitch">
              <input
                type="checkbox"
                name="notification"
                checked={formData.notification === 'Y'}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </div>
          </div>
          <div className="editProfileSubmit">
            <button type="button" onClick={() => window.history.back()}>
              취소
            </button>
            <button type="submit">수정</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
