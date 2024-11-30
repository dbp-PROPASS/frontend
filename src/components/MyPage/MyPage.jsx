import { React, useEffect} from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MyPageMenu from './MyPageMenu';
import EditProfile from './EditProfile'
import MyCertificate from './MyCertificate'
import DeleteAccount from './DeleteAccount'
import Cookies from 'js-cookie';
import '../../styles/MyPage/MyPage.css'

const MyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = Cookies.get('rememberEmail'); // 쿠키에서 토큰 가져오기

    if (!sessionToken) {
      alert("로그인이 필요합니다.");
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [navigate]);

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