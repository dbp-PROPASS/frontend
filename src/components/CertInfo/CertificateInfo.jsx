import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import '../../styles/Certinfo/CertificateInfo.css';

const CertificateInfo = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { certificate } = location.state || {};

  const [selectedRound, setSelectedRound] = useState(certificate?.examRounds[0]?.round || '');
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!certificate) {
    return <div>자격증 정보가 없습니다.</div>;
  }


  // 즐겨찾기 상태 토글 처리
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };



  return (
    <div className="certificate-info">
      <div className="header-container">
        <h2>{certificate.name}</h2>
      </div>
      <hr />
      <table className="totaltable">
        <tbody>
          <tr>
            <td rowSpan="3">
            <a href="https://www.naver.com" target="_blank" className="img-link">
                <div className="img">
                  <img src="https://cdn-icons-png.flaticon.com/512/5435/5435077.png" alt="description" />
                  <p className="img-description">▲ 사이트 바로가기</p>
                  
                </div>
            </a>
              <div
                className={`bookmark ${isBookmarked ? 'bookmarked' : ''}`}
                onClick={toggleBookmark}
              >
                {isBookmarked ? '★ 관심 자격증 등록' : '☆ 관심 자격증 등록'}
              </div>
            </td>
            <td>
              <h3>
                시험 차수
                
              </h3>
              {certificate.examRounds
                .filter((round) => round.round === selectedRound)
                .map((round, index) => (
                  <div key={index} className="exam-round">
                    <table className="exam-round-table">
                      <thead>
                        <tr>
                          <th>차수</th>
                          <th>접수 기간</th>
                          <th>시험 일자</th>
                          <th>합격 발표일</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{round.round}</td>
                          <td>{round.registrationPeriod}</td>
                          <td>{round.examDate}</td>
                          <td>{round.resultDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
            </td>
          </tr>
          <tr>
            <td className="exam-fee">
              <h3>응시료</h3>
              <ul>
                <li>1차: {certificate.fee}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="examgood">
              <h3>합격률</h3>
              <ul>
                <li>{certificate.passRate} ({certificate.year})</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CertificateInfo;