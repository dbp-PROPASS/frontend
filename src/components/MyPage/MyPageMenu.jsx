import React from 'react';
import { useNavigate } from 'react-router-dom';

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
            <ul className="nav-myPageMenu">
                <li className="nav-editProfile" onClick={moveToEditProfile}>회원 정보 수정</li>
                <li className="nav-myCertificate" onClick={moveToMyCertificate}>취득 자격증 관리</li>
                <li className="nav-deleteAccount" onClick={moveToDeleteAccount}>회원 탈퇴</li>
            </ul>
        </div>
    );
};

export default MyPageMenu;