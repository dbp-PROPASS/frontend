import React from 'react';
import '../../styles/MyPage/EditProfile.css'

const EditProfile = () => {
  return (
    <div className='editProfile'>
      <h2>회원 정보 수정</h2>
        <hr></hr>
        <div className='editProfileMainSection'>
          <form>
            <div className="editProfileField">
              <p>이름</p>
              <p> | </p>
              <input type="text"></input>
            </div>
            <div className="editProfileField">
              <p>PASSWORD</p>
              <p> | </p>
              <input type="text"></input>
            </div>
            <div className="editProfileField">
              <p>EMAIL</p>
              <p> | </p>
              <input type="text"></input>
              <button>인증 받기</button>
            </div>
            <div className="editProfileField">
              <p>전화번호</p>
              <p> | </p>
              <input type="text"></input>
              <button>인증 받기</button>
            </div>
            <div className="editProfileField">
              <p>연령대</p>
              <p> | </p>
              <input type="text"></input>
            </div>
            <div className="editProfileField">
              <p>관심분야</p>
              <p> | </p>
              <div class="selectWrapper">
                <select>
                  <option>선택하세요 ▼</option>
                  <option>분야 1</option>
                  <option>분야 2</option>
                </select>
              </div>
              <div className="editProfileAlarm">
                <p>알림 수신 동의</p>
                <label class="toggleSwitch">
                  <input type="checkbox" />
                  <span class="slider"></span>
                </label>
              </div>
            </div>
            <div className="editProfileSubmit">
              <button>취소</button>
              <button>수정</button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default EditProfile;