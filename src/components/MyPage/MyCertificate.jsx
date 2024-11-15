import React, { useEffect, useState } from 'react';
import '../../styles/MyPage/MyCertificate.css';

const MyCertificate = () => {
  const [certificates, setCertificates] = useState([]); // JSON 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태

  // JSON 파일에서 데이터 로드
  useEffect(() => {
    fetch('/certificates.json') // JSON 파일 경로
      .then((response) => response.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('데이터 로드 실패:', error);
        setLoading(false);
      });
  }, []);

  // 데이터 없을 때 출력할 메시지
  if (loading) {
    return <div>데이터 로딩 중...</div>;
  }

  if (certificates.length === 0) {
    return <div className="noData">검색된 데이터가 없습니다.</div>;
  }

  // 데이터가 있을 때 테이블 출력
  return (
    <div className="myCertificate">
      <h2>취득 자격증 관리</h2>
      <hr />
      <div className="certificateTable">
        <table>
          <thead>
            <tr>
              <th>선택</th>
              <th>종목/등급</th>
              <th>합격일자</th>
              <th>유효기간</th>
              <th>사진변경</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((certificate) => (
              <tr key={certificate.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{certificate.category}</td>
                <td>{certificate.passDate}</td>
                <td>{certificate.validityPeriod}</td>
                <td>
                  <button>변경</button>
                </td>
                <td>{certificate.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCertificate;
