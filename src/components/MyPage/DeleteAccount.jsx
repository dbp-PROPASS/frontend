import React from 'react';
import '../../styles/MyPage/DeleteAccount.css';

const DeleteAcccount = () => {
  return (
    <div className='deleteAcccount'>
        <h2>회원 탈퇴</h2>
        <hr></hr>
        <div className="deleteAcccountMainSection">
          <h3>회원 탈퇴 시 유의사항 안내</h3>
          <div className="deleteAccountWarning">
            <ul>
              <li>PROPASS 서비스를 탈퇴하면, PROPASS 아이디를 포함한 모든 PROPASS 서비스의 이용기록이 삭제됩니다.</li>
              <li>삭제된 정보는 복원할 수 없사오니 신중하게 선택해 주세요.</li>
            </ul>
          </div>
          <h3>회원 탈퇴 사유</h3>
          <textarea id="reason" placeholder="사유를 입력해주세요."></textarea>
          <button className="delete-submit-button">회원탈퇴</button>
        </div>
    </div>
  );
};

export default DeleteAcccount;