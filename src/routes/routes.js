import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import StartMenu from '../components/StartMenu';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import CertificateInfo from '../components/CertInfo/CertificateInfo';
import CertificateList from '../components/CertInfo/CertificateList';
import CertRecommender from '../components/CertRecommender/CertRecommender'
import Community from '../components/Community/Community'
import AddPosts from '../components/Community/AddPosts'
import MyPage from '../components/MyPage/MyPage'
import ScheduleManage from '../components/Schedule/ScheduleManage'
import FindPassword from '../components/Auth/FindPassword';

const AppRoutes = () => { 
    const [cookies] = useCookies(['rememberEmail']); // 쿠키에서 rememberEmail 확인
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 쿠키가 존재하면 로그인 상태로 설정
        setIsLoggedIn(!!cookies.rememberEmail);
    }, [cookies]);

    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <ScheduleManage /> : <StartMenu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/certificateInfo/:certName" element={<CertificateInfo />} />
            <Route path="/certificateList" element={<CertificateList />} />
            <Route path="/certRecommender" element={<CertRecommender />} />
            <Route path="/community" element={<Community />} />
            <Route path="/AddPosts" element={<AddPosts />} />
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/FindPassword" element={<FindPassword />} />
        </Routes>
    );
};

export default AppRoutes;