import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Certinfo/CertificateList.css';
import jsonData from '../../data/CertificateData.json';

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [certificatesPerPage] = useState(5); // 한 페이지에 표시할 자격증 수
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    setCertificates(jsonData);
    setCurrentPage(1); // 페이지 로드 시 항상 1페이지로 설정
  }, []);

  // 현재 페이지에 해당하는 자격증 데이터 가져오기
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;

  // 검색어에 따라 필터링된 자격증 목록
  const filteredCertificates = certificates.filter(cert =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어로 자격증 필터링
  );

  // 현재 페이지에 해당하는 자격증 데이터
  const currentCertificates = filteredCertificates.slice(indexOfFirstCertificate, indexOfLastCertificate);

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage);

  // 페이지 버튼 범위 계산
  const getPaginationRange = () => {
    const range = [];
    const basePage = Math.floor((currentPage - 1) / 3) * 3 + 1; // 현재 페이지를 기준으로 3의 배수로 맞추기

    // 3개의 페이지 번호를 추가
    for (let i = 0; i < 3; i++) {
      const page = basePage + i;
      if (page > 0 && page <= totalPages) {
        range.push(page);
      }
    }

    return range;
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 다음 페이지로 이동 핸들러
  const handleNextPage = () => {
    const pagesPerGroup = 3; // 한 번에 보여주는 페이지 수
    const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage); // 총 페이지 수 계산
    const totalGroups = Math.ceil(totalPages / pagesPerGroup); // 총 그룹 수
    const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 그룹 계산
  
    if (currentGroup < totalGroups) {
      // 다음 그룹의 첫 번째 페이지로 이동
      const nextGroupStartPage = currentGroup * pagesPerGroup + 1;
      setCurrentPage(nextGroupStartPage);
    }
  };
  

  // 이전 페이지로 이동 핸들러
  const handlePreviousPage = () => {
    if (currentPage > 1) { // 현재 페이지가 1보다 클 때만 실행
      if (currentPage % 3 === 0) { // 6일 경우 -> 3페이지 이동
        setCurrentPage(currentPage - 3);
      } else if (currentPage % 3 === 1) { // 4일 경우 -> 3페이지
        setCurrentPage(currentPage - 1);
      } else if (currentPage % 3 === 2) { // 5일 경우 -> 3페이지
        setCurrentPage(currentPage - 2);
      }
    }
  };

  // 이전 버튼의 활성화 상태를 결정하는 변수
  const isPreviousButtonVisible = currentPage > 3; // 현재 페이지가 3의 배수보다 클 경우

  // 다음 버튼의 활성화 상태를 결정하는 변수
  const isNextButtonVisible = () => {
    const pagesPerGroup = 3; // 한 번에 보여주는 페이지 수
    const totalPages = Math.ceil(filteredCertificates.length / certificatesPerPage); // 총 페이지 수 계산
    const totalGroups = Math.ceil(totalPages / pagesPerGroup); // 총 그룹 수
    const currentGroup = Math.ceil(currentPage / pagesPerGroup); // 현재 그룹 계산
  
    return currentGroup < totalGroups; // 현재 그룹이 마지막 그룹보다 작을 때만 활성화
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  // 검색 버튼 클릭 시 해당 자격증 정보로 이동하는 핸들러
  const handleSearchSubmit = () => {
    const selectedCertificate = filteredCertificates.find(cert =>
      cert.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (selectedCertificate) {
      // 검색어에 해당하는 자격증 정보가 있으면 해당 정보로 이동
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
          onChange={handleSearchChange} // 검색어 변경 핸들러 추가
        />
        <button onClick={handleSearchSubmit}>검색</button> {/* 검색 버튼 클릭 시 해당 자격증 정보로 이동 */}
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
                  onClick={() => navigate('/certificateInfo', { state: { certificate: cert } })} // 행 클릭 시 이동
                >
                  <td>{cert.name}</td>
                  <td>{cert.round}</td>
                  <td>{cert.fee}</td>
                  <td>{cert.field}</td>
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
        {/* 이전 페이지 버튼 */}
        {isPreviousButtonVisible && (
          <button className="bold" onClick={handlePreviousPage}>
            &lt;&lt;
          </button>
        )}
        
        {getPaginationRange().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
        
        {/* 다음 페이지 버튼 */}
        {isNextButtonVisible() && ( // 수정: 조건이 false인 경우 버튼 자체가 DOM에 렌더링되지 않음
        <button className="bold" onClick={handleNextPage}>
          &gt;&gt;
        </button>
        )}
      </div>
    </div>
  );
};

export default CertificateList;