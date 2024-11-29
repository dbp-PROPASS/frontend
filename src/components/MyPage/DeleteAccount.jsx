import React from 'react';
import Cookies from 'js-cookie'; // 쿠키 읽기 라이브러리
import '../../styles/MyPage/DeleteAccount.css';

const handleDelete = async () => {
  try {
    const email = Cookies.get('rememberEmail'); // 쿠키에서 이메일 가져오기

    const response = await fetch(
      `http://localhost:5000/api/account/${email}`,
      { method: "DELETE" }
    );

    const data = await response.json();

    if (data.success) {
      alert(data.message); // 회원탈퇴 성공 메시지
      // 추가: 로그아웃 처리 및 메인 페이지로 이동
      Cookies.remove('rememberEmail');
      window.location.href = '/';
    } else {
      alert(data.message); // 실패 메시지
    }
  } catch (error) {
    console.error("에러 발생:", error);
    alert("회원탈퇴 중 오류가 발생했습니다.");
  }
};

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
          <button className="delete-submit-button" onClick={handleDelete}>회원탈퇴</button>
        </div>
    </div>
  );
};

export default DeleteAcccount;
