import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import "../../styles/CertRecommender/CertRecommender.css";

const CertRecommender = () => {
  const [currentInterest, setCurrentInterest] = useState(0);
  const [formData, setFormData] = useState({
    age_group: "",
    interests: [],
  });
  const [popularCertifications, setPopularCertifications] = useState({});
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = Cookies.get('rememberEmail'); // 쿠키에서 토큰 가져오기

    if (!sessionToken) {
      alert("로그인이 필요합니다.");
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [navigate]);

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = Cookies.get("rememberEmail");
        if (!email) throw new Error("로그인 정보가 없습니다.");

        const response = await axios.get(`http://localhost:5000/api/users/${email}`);
        const userData = response.data;
        setFormData({
          age_group: userData.age_group || "",
          interests: userData.interests
            ? userData.interests.split(",")
            : [],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // API에서 자격증 추천 가져오기
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const age_group = formData.age_group;
        const interest = formData.interests[currentInterest];
        const encodedCategory = encodeURIComponent(interest);

        // 연령대별 추천 가져오기
        const ageGroupResponse = await axios.get(
          `http://localhost:5000/api/ageGroup/${age_group}`
        );
        console.log('Age group recommendations:', ageGroupResponse.data); // 디버깅 로그
  
        // 관심사별 추천 가져오기
        const interestResponse = await axios.get(
          `http://localhost:5000/api/category/${encodedCategory}`
        );
        console.log('Interest recommendations:', interestResponse.data); // 디버깅 로그
  
        // 상태 업데이트
        setPopularCertifications(prevState => ({
          ...prevState,
          [age_group]: ageGroupResponse.data,
          [interest]: interestResponse.data,
        }));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (formData.age_group || formData.interests.length > 0) {
      fetchRecommendations();
    }
  }, [formData, currentInterest]);

  const handleArrowClick = (direction) => {
    if (direction === "next") {
      setCurrentInterest(
        (prev) => (prev + 1) % formData.interests.length
      );
    } else if (direction === "prev") {
      setCurrentInterest(
        (prev) =>
          (prev - 1 + formData.interests.length) %
          formData.interests.length
      );
    }
  };

  const currentInterestField = formData.interests[currentInterest];

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const container = titleElement.parentElement;

      // 부모 컨테이너와 텍스트의 너비 비교
      if (titleElement.scrollWidth > container.clientWidth) {
        titleElement.style.animation = "scrollText 10s linear infinite";
      } else {
        titleElement.style.animation = "none";
      }
    }
  }, [currentInterest, formData]);

  return (
    <div className="certRecommender">
      {formData.age_group && (
        <div className="itemForRecommend">
          <h2 className="itemRecoTitle">{`${formData.age_group}대 인기 자격증`}</h2>
          <ul className="itemRecoList">
            {(popularCertifications[formData.age_group] || []).flat().map(
              (certification, index) => (
                <li key={index} className="itemRecoItem">
                  {index + 1}. {certification}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {formData.interests.length > 0 && (
        <div className="itemForRecommend">
          <div className="navigation">
            {formData.interests.length > 1 && (
              <>
                <button onClick={() => handleArrowClick("prev")} className="arrowButton">⬅</button>
              </>
            )}
            <h2 className="itemRecoTitle">
              <span ref={titleRef}>{currentInterestField} 인기 자격증</span>
            </h2>
            {formData.interests.length > 1 && (
              <>
                <button onClick={() => handleArrowClick("next")} className="arrowButton">➡</button>
              </>
            )}
          </div>
          <ul className="itemRecoList">
            {(popularCertifications[currentInterestField] || []).flat().map(
              (certification, index) => (
                <li key={index} className="itemRecoItem">
                  {index + 1}. {certification}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CertRecommender;
