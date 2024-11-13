import React, { useState, useEffect } from 'react';
import ItemForRecommend from './ItemForRecommend'
import '../../styles/CertRecommender/CertRecommender.css'

const CertRecommender = () => {
  const [popularCertificationsFor20s, setPopularCertificationsFor20s] = useState([]);
  const [popularITCertifications, setPopularITCertifications] = useState([]);

  useEffect(() => {
    // 테스트용 데이터를 가져오는 함수 (실제 API 호출로 대체 가능)
    const fetchData = async () => {
      const mockData = {
        popular_certifications_for_20s: [
          "TOEIC (토익)",
          "컴퓨터활용능력",
          "한국사능력검정시험",
          "MOS (Microsoft Office Specialist)",
          "OPIc (오픽)",
          "JLPT (일본어능력시험)",
          "GTQ (그래픽기술자격)",
          "운전면허증",
          "바리스타 자격증",
          "산업안전기사"
        ],
        popular_IT_certifications: [
          "정보처리기사",
          "리눅스마스터",
          "SQLD (SQL 개발자)",
          "AWS Certified Solutions Architect",
          "CCNA (Cisco Certified Network Associate)",
          "OCJP (Oracle Certified Java Programmer)",
          "Kubernetes Certification (CKA/CKAD)",
          "Azure Administrator Certification",
          "컴퓨터시스템응용기술사",
          "Python Programming Certification"
        ]
      };

      // 데이터 설정
      setPopularCertificationsFor20s(mockData.popular_certifications_for_20s);
      setPopularITCertifications(mockData.popular_IT_certifications);
    };

    fetchData();
  }, []); // 빈 배열이므로 컴포넌트 마운트 시 한 번 실행

  return (
    <div className='certRecommender'>
      <ItemForRecommend
        title="20대 인기 자격증"
        certifications={popularCertificationsFor20s}
      />
      <ItemForRecommend
        title="IT 관련 인기 자격증"
        certifications={popularITCertifications}
      />
    </div>
  );
};

export default CertRecommender;