import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/MyPage/MyPageMenu.css'

const MyPageMenu = () => {
    const navigate = useNavigate();

    const moveToEditProfile = () => {
        navigate('editProfile');
    };
    
    const moveToMyCertificate = () => {
        navigate('myCertificate');
    };
    
    const moveToDeleteAccount = () => {
        navigate('deleteAccount');
    };    

    return (
        <div className='myPageMenu'>
            <h2>MY PAGE</h2>
            <hr></hr>
            <ul className="nav-myPageMenu">
                <li className="nav-editProfile" onClick={moveToEditProfile}>회원 정보 수정</li>
                <li className="nav-myCertificate" onClick={moveToMyCertificate}>취득 자격증 관리</li>
                <li className="nav-deleteAccount" onClick={moveToDeleteAccount}>회원 탈퇴</li>
            </ul>
            <hr></hr>
        </div>
    );
};

export default MyPageMenu;