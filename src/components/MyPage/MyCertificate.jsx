import React, { useEffect, useState } from 'react';
import '../../styles/MyPage/MyCertificate.css';

const MyCertificate = () => {
  const [certificates, setCertificates] = useState([]); // JSON 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [newCertificate, setNewCertificate] = useState({ // 새 항목 데이터
    category: '',
    passDate: '',
    validityPeriod: '',
    remarks: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  const [currentId, setCurrentId] = useState(null); // 수정하려는 자격증 ID

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

  // 항목 추가 함수
  const handleAddCertificate = () => {
    if (!newCertificate.category || !newCertificate.passDate || !newCertificate.validityPeriod) {
      alert('모든 필드를 입력하세요!');
      return;
    }

    const newId = certificates.length ? certificates[certificates.length - 1].id + 1 : 1; // 새 ID
    setCertificates([...certificates, { id: newId, ...newCertificate }]);
    setNewCertificate({ category: '', passDate: '', validityPeriod: '', remarks: '' }); // 입력 초기화
    setIsModalOpen(false); // 모달 닫기
  };

  // 수정된 항목 저장 함수
  const handleUpdateCertificate = () => {
    if (!newCertificate.category || !newCertificate.passDate || !newCertificate.validityPeriod) {
      alert('모든 필드를 입력하세요!');
      return;
    }

    setCertificates(certificates.map((certificate) =>
      certificate.id === currentId ? { ...certificate, ...newCertificate } : certificate
    ));
    setNewCertificate({ category: '', passDate: '', validityPeriod: '', remarks: '' }); // 입력 초기화
    setIsModalOpen(false); // 모달 닫기
    setEditMode(false); // 수정 모드 종료
  };
     
  // 선택 삭제 함수
  const handleDeleteSelected = () => {
    const checkboxes = document.querySelectorAll('.certificateCheckbox:checked');
    const idsToDelete = Array.from(checkboxes).map((checkbox) => Number(checkbox.value));
    setCertificates(certificates.filter((certificate) => !idsToDelete.includes(certificate.id)));
  };

  // 수정 버튼 클릭 시 모달 열기
  const handleEditClick = (certificate) => {
    setCurrentId(certificate.id); // 수정할 항목의 ID 저장
    setNewCertificate(certificate); // 모달에 수정할 데이터 채우기
    setIsModalOpen(true); // 모달 열기
    setEditMode(true); // 수정 모드 활성화
  };

  // 데이터 없을 때 출력할 메시지
  if (loading) {
    return <div>데이터 로딩 중...</div>;
  }

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
              <th>비고</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {certificates.length > 0 ? (
              certificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="certificateCheckbox"
                      value={certificate.id}
                    />
                  </td>
                  <td>{certificate.category}</td>
                  <td>{certificate.passDate}</td>
                  <td>{certificate.validityPeriod}</td>
                  <td>{certificate.remarks}</td>
                  <td>
                    <button onClick={() => handleEditClick(certificate)}>수정</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="noData">검색된 데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='buttonForMyCertificate'>
        {/* 자격증 추가 버튼 */}
        <button onClick={() => {
          setIsModalOpen(true);
          setEditMode(false); // 추가 모드로 설정
          setNewCertificate({ category: '', passDate: '', validityPeriod: '', remarks: '' }); // 초기화
        }} className="addButton">자격증 추가</button>

        {/* 선택 삭제 */}
        {certificates.length > 0 && (
          <button onClick={handleDeleteSelected} className="deleteButton">선택 삭제</button>
        )}
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h3>{editMode ? '자격증 수정' : '새 자격증 추가'}</h3>
            <input
              type="text"
              placeholder="종목/등급"
              value={newCertificate.category}
              onChange={(e) => setNewCertificate({ ...newCertificate, category: e.target.value })}
            />
            <input
              type="date"
              placeholder="합격일자"
              value={newCertificate.passDate}
              onChange={(e) => setNewCertificate({ ...newCertificate, passDate: e.target.value })}
            />
            <input
              type="date"
              placeholder="유효기간"
              value={newCertificate.validityPeriod}
              onChange={(e) => setNewCertificate({ ...newCertificate, validityPeriod: e.target.value })}
            />
            <input
              type="text"
              placeholder="비고 (선택)"
              value={newCertificate.remarks}
              onChange={(e) => setNewCertificate({ ...newCertificate, remarks: e.target.value })}
            />
            <div className="modalButtons">
              {/* 수정 버튼 */}
              {editMode ? (
                <button onClick={handleUpdateCertificate}>수정</button>
              ) : (
                <button onClick={handleAddCertificate}>추가</button>
              )}
              <button onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCertificate;
