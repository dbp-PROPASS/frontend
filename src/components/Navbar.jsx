import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    
    const moveToStartMenu = () => {
        navigate('/');
    };

    const moveToCertList = () => {
        navigate('/certificateList');
    };

    const moveToCertRecommender = () => {
        navigate('/certRecommender');
    };

    const moveToCommunity = () => {
        navigate('/community');
    };

    const moveToMyPage = () => {
        navigate('/myPage');
    };

    const moveToLogin = () => {
        navigate('/login');
    };

    const moveToSchedule = () => {
        navigate('/scheduleManage');
    }

    return (
        <div className='nav'>
            <div className="nav-startMenu" onClick={moveToStartMenu}>PROPASS</div>
            <ul className="nav-menu">
                <li className="nav-schedule" onClick={moveToSchedule}>일정 관리</li>
                <li className="nav-certList" onClick={moveToCertList}>자격증 검색</li>
                <li className="nav-certRecommender" onClick={moveToCertRecommender}>자격증 추천</li>
                <li className="nav-community" onClick={moveToCommunity}>커뮤니티</li>
                <li className="nav-myPage" onClick={moveToMyPage}>MyPage</li>
                <li className="nav-login" onClick={moveToLogin}>로그인</li>
            </ul>
        </div>
    );
};

export default Navbar;