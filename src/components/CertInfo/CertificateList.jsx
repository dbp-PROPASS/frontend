import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Certinfo/CertificateList.css';

const CertificateList = ({ certificateData }) => {
  const [certificates, setCertificates] = useState(Array.isArray(certificateData) ? certificateData : []); // 올바른 배열로 초기화
  const [currentPage, setCurrentPage] = useState(1);
  const [certificatesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (certificateData && Array.isArray(certificateData)) {
      setCertificates(certificateData); // props로 받은 데이터로 업데이트
    } else {
      fetch('http://localhost:5000/api/certificate')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(receivedData => {
          if (Array.isArray(receivedData)) {
            setCertificates(receivedData); // 받은 데이터로 certificates 상태 업데이트
          } else {
            console.error('Unexpected data format:', receivedData);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [certificateData]);

  // 중복된 자격증을 제거하는 로직
  const removeDuplicates = (data) => {
    const uniqueMap = new Map();
    data.forEach(cert => {
      const key = `${cert.ROUND_ID}-${cert.EXAM_TYPE}`; // 복합키를 사용하여 중복 제거
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, cert);
      }
    });
    return Array.from(uniqueMap.values());
  };

  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;

  // 검색어에 따라 필터링된 자격증 목록
  const filteredCertificates = certificates.filter(cert =>
    cert.CERT_NAME && cert.CERT_NAME.toLowerCase().includes(searchTerm.toLowerCase()) // name이 없을 경우 처리
  );

  // 중복을 제거한 인증서 목록
  const uniqueCertificates = removeDuplicates(filteredCertificates);

  const currentCertificates = uniqueCertificates.slice(indexOfFirstCertificate, indexOfLastCertificate);
  const totalPages = Math.ceil(uniqueCertificates.length / certificatesPerPage);

  const getPaginationRange = () => {
    const range = [];
    const basePage = Math.floor((currentPage - 1) / 3) * 3 + 1;

    for (let i = 0; i < 3; i++) {
      const page = basePage + i;
      if (page > 0 && page <= totalPages) {
        range.push(page);
      }
    }

    return range;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    const pagesPerGroup = 3;
    const totalGroups = Math.ceil(totalPages / pagesPerGroup);
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);

    if (currentGroup < totalGroups) {
      const nextGroupStartPage = currentGroup * pagesPerGroup + 1;
      setCurrentPage(nextGroupStartPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      if (currentPage % 3 === 0) {
        setCurrentPage(currentPage - 3);
      } else if (currentPage % 3 === 1) {
        setCurrentPage(currentPage - 1);
      } else if (currentPage % 3 === 2) {
        setCurrentPage(currentPage - 2);
      }
    }
  };

  const isPreviousButtonVisible = currentPage > 3;

  const isNextButtonVisible = () => {
    const totalGroups = Math.ceil(totalPages / 3);
    const currentGroup = Math.ceil(currentPage / 3);

    return currentGroup < totalGroups;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = () => {
    const selectedCertificate = filteredCertificates.find(cert =>
      cert.CERT_NAME.trim().toLowerCase() === searchTerm.trim().toLowerCase()
    );

    if (selectedCertificate) {
      navigate(`/certificateInfo/${encodeURIComponent(selectedCertificate.CERT_NAME)}`, { state: { certName: selectedCertificate.CERT_NAME } });
    } else {
      alert('검색한 자격증을 찾을 수 없습니다.');
    }
  };

  return (
    <div className="certificateList">
      {/* 검색 섹션 */}
      <div className="search-section">
        <input
          type="text"
          placeholder="자격증을 입력하세요."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchSubmit}>검색</button>
      </div>

      {/* 표 섹션 */}
      <div className="table-section">
        <h2>전체 자격증</h2>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>차수</th>
              <th>기관</th>
              <th>분야</th>
            </tr>
          </thead>
          <tbody>
            {currentCertificates.length > 0 ? (
              currentCertificates.map((cert) => (
                <tr
                  key={`${cert.ROUND_ID}-${cert.EXAM_TYPE}`} // 복합키를 이용한 고유한 key
                  className="clicktr"
                  onClick={() => {
                    navigate(`/certificateInfo/${encodeURIComponent(cert.CERT_NAME)}`, { state: { certName: cert.CERT_NAME } });
                  }}
                >
                  <td>{cert.CERT_NAME}</td>
                  <td>{cert.ROUND_ID}</td>
                  <td>{cert.CERT_ORG}</td>
                  <td>{cert.CATEGORY}</td>  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">자격증 정보가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지 네비게이션 */}
      <div className="pagination">
        {isPreviousButtonVisible && (
          <button className="bold" onClick={handlePreviousPage}>
            &lt;&lt;
          </button>
        )}

        {getPaginationRange().map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
        
        {isNextButtonVisible() && (
          <button className="bold" onClick={handleNextPage}>
            &gt;&gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificateList;
