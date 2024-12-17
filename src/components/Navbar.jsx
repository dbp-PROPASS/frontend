import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['rememberEmail']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인 (쿠키 존재 여부로 판단)
    setIsLoggedIn(!!cookies.rememberEmail);
  }, [cookies]);

  const handleLogout = () => {
    // 쿠키 삭제 및 상태 업데이트
    removeCookie('rememberEmail', { path: '/' });
    setIsLoggedIn(false);
    setShowModal(false);
    alert('로그아웃 되었습니다.');
    navigate("/login");
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="nav">
      <div className="nav-startMenu" onClick={() => navigate('/')}>PROPASS</div>
      <ul className="nav-menu">
        <li className="nav-certList" onClick={() => navigate('/certificateList')}>자격증 검색</li>
        <li className="nav-certRecommender" onClick={() => navigate('/certRecommender')}>자격증 추천</li>
        <li className="nav-community" onClick={() => navigate('/community')}>커뮤니티</li>
        <li className="nav-myPage" onClick={() => navigate('/myPage')}>MyPage</li>
        <li className="nav-login" onClick={isLoggedIn ? openModal : () => navigate('/login')}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </li>
      </ul>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>정말 로그아웃 하시겠습니까?</p>
            <button onClick={handleLogout}>네</button>
            <button onClick={closeModal} >아니요</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
