// import React, { useState } from 'react';

// const FindPassword = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault(); // 기본 폼 제출 동작 방지
//     console.log('이름:', name);
//     console.log('이메일:', email);
//     console.log('전화번호:', phone);
//     alert('비밀번호 찾기 요청이 완료되었습니다.');
//   };

//   return (
//     <div className="FindPassword">
//       <h2>비밀번호 찾기</h2>
//       <div className="signUpMainSection">
//         <form onSubmit={handleSubmit}>
//           <div className="FindField">
//             <p>이름</p>
//             <p> | </p>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="FindField">
//             <p>EMAIL</p>
//             <p> | </p>
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button type="button">인증 받기</button>
//           </div>
//           <div className="FindField">
//             <p>전화번호</p>
//             <p> | </p>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             <button type="button">인증 받기</button>
//           </div>
//           <div className="signUpSubmit">
//             <button type="submit">비밀번호 찾기</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FindPassword;
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