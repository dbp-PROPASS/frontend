import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Certinfo/CertificateInfo.css';

const CertificateInfo = () => {
  const location = useLocation();
  const certificate = location.state?.certificate;

  // localStorage에서 즐겨찾기 상태 불러오기
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const storedBookmarkStatus = localStorage.getItem(`bookmark-${certificate?.CERT_ID}`);
    return storedBookmarkStatus === 'true'; // 'true'일 경우 즐겨찾기 상태
  });

  useEffect(() => {
    if (certificate) {
      // certificate 데이터가 있을 때마다 localStorage에 저장
      localStorage.setItem('certificate', JSON.stringify(certificate));
    }
  }, [certificate]);

  if (!certificate) {
    return <div>자격증 정보가 없습니다. 데이터를 다시 확인해주세요.</div>;
  }

  // 즐겨찾기 상태 토글 처리
  const toggleBookmark = () => {
    setIsBookmarked((prev) => {
      const newStatus = !prev;
      // 변경된 상태를 localStorage에 저장
      localStorage.setItem(`bookmark-${certificate.CERT_ID}`, newStatus.toString());
      return newStatus;
    });
  };

  return (
    <div className="certificate-info">
      <div className="header-container">
        <h2>{certificate.CERT_NAME || '자격증 이름 없음'}</h2>
      </div>
      <hr />
      <table className="totaltable">
        <tbody>
          <tr>
            <td rowSpan="3">
              <a href="https://www.naver.com" target="_blank" className="img-link" rel="noopener noreferrer">
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
              <h3>시험 차수</h3>
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
                    <td>{certificate.ROUND_ID || '정보 없음'}</td>
                    <td>
                      {certificate.RECEPTION_START_DATE || '정보 없음'} ~{' '}
                      {certificate.RECEPTION_FINISH_DATE || '정보 없음'}
                    </td>
                    <td>{certificate.EXAM_DATE || '정보 없음'}</td>
                    <td>{certificate.RESULT_DATE || '정보 없음'}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className="exam-fee">
              <h3>응시료</h3>
              <ul>
                <li>{certificate.FEE || '정보 없음'} 원</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td className="examgood">
              <h3>합격률</h3>
              <ul>
                <li>{certificate.PASS_RATE || '정보 없음'}%</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CertificateInfo;
