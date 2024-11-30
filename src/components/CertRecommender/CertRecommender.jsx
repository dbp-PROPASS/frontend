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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = Cookies.get("rememberEmail");
        if (!email) throw new Error("로그인 정보가 없습니다.");

        const response = await axios.get(
          `http://localhost:5000/api/users/${email}`
        );
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

  useEffect(() => {
    const mockData = {
      "IT/컴퓨터": ["정보처리기사", "리눅스마스터", "AWS Certified Solutions Architect"],
      "어학": ["TOEIC", "JLPT", "OPIc"],
      "경영/회계/금융": ["CPA", "ACCA", "FRM"],
      "건축/토목/기술": ["토목기사", "건축기사", "기계기사"],
      "의료/보건": ["간호사", "의사", "약사"],
      "교육/상담": ["임용고시", "상담사", "심리상담사"],
      "공예/디자인": ["그래픽디자인", "웹디자인", "패션디자인", "그래픽디자인", "웹디자인", "패션디자인", "그래픽디자인", "웹디자인", "패션디자인", "그래픽디자인"],
      "조리/식음료": ["바리스타", "소믈리에", "요리사"],
      "운전/기계": ["운전면허", "자동차정비기사", "기계기사"],
      "국가자격증": ["한국사능력검정시험", "산업안전기사", "MOS"],
    };
    setPopularCertifications(mockData);
  }, []);

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
            {(popularCertifications[formData.age_group] || []).map(
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
            {(popularCertifications[currentInterestField] || []).map(
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
