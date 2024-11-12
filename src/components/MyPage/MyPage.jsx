import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyPageMenu from './MyPageMenu';
import EditProfile from './EditProfile'
import MyCertificate from './MyCertificate'
import DeleteAccount from './DeleteAccount'
import '../../styles/MyPage/MyPage.css'

const MyPage = () => {
  return (
    <div className='myPage'>
       <MyPageMenu/>
       <div className="myPageContent">
        <Routes>
            <Route path="/" element={<Navigate to="editProfile" />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="myCertificate" element={<MyCertificate />} />
            <Route path="deleteAccount" element={<DeleteAccount />} />
        </Routes>
       </div>
    </div>
  );
};

export default MyPage;