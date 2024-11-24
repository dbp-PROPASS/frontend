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
    if (certificateData && certificateData.length > 0) {
      console.log('데이터가 정상적으로 로드됨:', certificateData);
    } else {
      console.log('데이터가 로드되지 않음');
    }
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
  

  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;

  // 검색어에 따라 필터링된 자격증 목록
  const filteredCertificates = certificates.filter(cert =>
    cert.CERT_NAME && cert.CERT_NAME.toLowerCase().includes(searchTerm.toLowerCase()) // name이 없을 경우 처리
  );

  const currentCertificates = filteredCertificates.slice(indexOfFirstCertificate, indexOfLastCertificate);

  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);

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
    const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);
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
    const pagesPerGroup = 3;
    const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);
    const totalGroups = Math.ceil(totalPages / pagesPerGroup);
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);

    return currentGroup < totalGroups;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = () => {
    const selectedCertificate = filteredCertificates.find(cert =>
      cert.CERT_NAME.toLowerCase() === searchTerm.toLowerCase()
    );

    if (selectedCertificate) {
      navigate('/certificateInfo', { state: { certificate: selectedCertificate } });
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
              <th>응시료</th>
              <th>분야</th>
            </tr>
          </thead>
          <tbody>
            {currentCertificates.length > 0 ? (
              currentCertificates.map((cert, index) => (
                <tr
                  key={index}
                  className="clicktr"
                  onClick={() => {
                    console.log("전달 전체 값", cert); // `cert` 전체 값 확인
                    navigate('/certificateInfo', { state: { certificate: cert } }); // ID만 전달
                  }}
                >
                  <td>{cert.CERT_NAME}</td>
                  <td>{cert.ROUND_ID}</td>
                  <td>{cert.FEE}</td>
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
