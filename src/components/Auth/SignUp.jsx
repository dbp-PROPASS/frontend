import React from 'react';
import '../../styles/SignUp.css';

const SignUp = () => {
  return (
    <div className='signUp'>
       <h2>SIGN UP</h2>
        <div className='signUpMainSection'>
          <form>
            <div className="signUpField">
              <p>이름</p>
              <p> | </p>
              <input type="text"></input>
            </div>
            <div className="signUpField">
              <p>PASSWORD</p>
              <p> | </p>
              <input type="text"></input>
            </div>
            <div className="signUpField">
              <p>EMAIL</p>
              <p> | </p>
              <input type="text"></input>
              <button>인증 받기</button>
            </div>
            <div className="signUpField">
              <p>전화번호</p>
              <p> | </p>
              <input type="text"></input>
              <button>인증 받기</button>
            </div>
            <div className="signUpField">
              <p>연령대</p>
              <p> | </p>
              <input type="text"></input>
            </div>
            <div className="signUpField">
              <p>관심분야</p>
              <p> | </p>
              <div class="signUpselectWrapper">
                <select>
                  <option>선택하세요 ▼</option>
                  <option>분야 1</option>
                  <option>분야 2</option>
                </select>
              </div>
              <div className="signUpAlarm">
                <p>알림 수신 동의</p>
                <label class="toggleSwitch">
                  <input type="checkbox" />
                  <span class="slider"></span>
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