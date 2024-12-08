import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const AppRoutes = ({ data }) => { 
    return (
        <Routes>
            <Route path="/" element={<StartMenu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/certificateInfo/:certName" element={<CertificateInfo />} />
            <Route path="/certificateList" element={<CertificateList />} />
            <Route path="/certRecommender" element={<CertRecommender />} />
            <Route path="/community" element={<Community />} />
            <Route path="/AddPosts" element={<AddPosts />} />
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/scheduleManage" element={<ScheduleManage />} />
            <Route path="/FindPassword" element={<FindPassword />} />
        </Routes>
    );
};

export default AppRoutes;