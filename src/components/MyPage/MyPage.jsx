import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPageMenu from './MyPageMenu';
import EditProfile from './EditProfile'
import MyCertificate from './MyCertificate'
import DeleteAccount from './DeleteAccount'
import '../../styles/MyPage/MyPage.css'

const MyPage = () => {
  return (
    <div className='myPage'>
       <MyPageMenu/>
       <Routes>
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="myCertificate" element={<MyCertificate />} />
          <Route path="deleteAccount" element={<DeleteAccount />} />
      </Routes>
    </div>
  );
};

export default MyPage;