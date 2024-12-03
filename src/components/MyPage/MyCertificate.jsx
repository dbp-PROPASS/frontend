import React, { useEffect, useState } from 'react';
import '../../styles/MyPage/MyCertificate.css';
import Cookies from 'js-cookie';

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
  const [mem_id, setMemId] = useState(null);
  const sessionEmail = Cookies.get('rememberEmail'); 

  // 이메일로 mem_id 가져오기
  useEffect(() => {
    const fetchMemId = async () => {
      if (!sessionEmail) {
        console.error('이메일이 없습니다.');
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/bookmark/getMemId?email=${encodeURIComponent(sessionEmail)}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.mem_id) {
            setMemId(data.mem_id);
          } else {
            console.error('mem_id가 존재하지 않습니다.');
          }
        } else {
          console.error('mem_id 요청 실패:', response.status);
        }
      } catch (error) {
        console.error('mem_id 가져오기 실패:', error);
      }
    };
    if (sessionEmail) fetchMemId();
  }, [sessionEmail]);
  
  // 자격증 조회 함수
  const fetchCertificates = async () => {
    if (!mem_id) {
      console.log('mem_id가 없어서 자격증을 가져올 수 없습니다.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/ownCertificate?mem_id=${mem_id}`);
      if (!response.ok) throw new Error('데이터 로드 실패');
      const data = await response.json();
      if (data.certificates) {
        setCertificates(data.certificates); // 데이터가 배열이라면 이와 같이 설정
      }
      setLoading(false); // 로딩 완료
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      setLoading(false);
    }
  };

  // 자격증 추가 함수
  const handleAddCertificate = async () => {
    if (!mem_id) {
      console.log('mem_id가 없어서 자격증을 추가할 수 없습니다.');
      return;
    }
    if (!newCertificate.category || !newCertificate.passDate || !newCertificate.validityPeriod) {
      alert('모든 필드를 입력하세요!');
      return;
    }

    const certificateData = {
      C_CERT_NAME: newCertificate.category,
      C_EXAM_DATE: newCertificate.passDate,
      ACQISITION_DATE: newCertificate.validityPeriod,
      OWN_INFO: newCertificate.remarks,
      MEM_ID: mem_id,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/ownAddCertificate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificateData),
      });

      if (!response.ok) throw new Error('추가 실패');

      const addedCertificate = await response.json();  // 서버에서 추가된 자격증 정보를 가져옵니다.

      // 기존 certificates 상태에 새 자격증 데이터를 추가합니다.
      setCertificates((prevCertificates) => [...prevCertificates, addedCertificate]);

      // 입력 필드 초기화 및 모달 닫기
      setNewCertificate({ category: '', passDate: '', validityPeriod: '', remarks: '' });
      setIsModalOpen(false);

      // 자격증 추가 후 최신 자격증 목록을 가져옵니다.
      fetchCertificates();  // 이 부분을 추가

    } catch (error) {
      console.error('추가 실패:', error);
    }
  };

  // 자격증 조회 (mem_id 의존성)
  useEffect(() => {
    if (mem_id) fetchCertificates();
  }, [mem_id]);
  
  //자격증 수정 (업데이트)
  const handleUpdateCertificate = async () => {
    if (!newCertificate.category || !newCertificate.passDate || !newCertificate.validityPeriod) {
      alert('모든 필드를 입력하세요!');
      return;
    }
    const id = currentId.trim();
  
    try {
      const response = await fetch(`http://localhost:5000/api/ownUpdateCertificate/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id, // 수정할 자격증 ID
          category: newCertificate.category,
          passDate: newCertificate.passDate,
          validityPeriod: newCertificate.validityPeriod,
          remarks: newCertificate.remarks,
        }),
      });
  
      if (!response.ok) {
      const errorData = await response.json();
      console.log('응답 오류 데이터:', errorData);
      throw new Error('수정 실패');
      }
  
      const updatedCertificate = await response.json();
      setCertificates(certificates.map((cert) =>
        cert.OWNED_CERT_ID === currentId ? updatedCertificate : cert
      ));
      setNewCertificate({ category: '', passDate: '', validityPeriod: '', remarks: '' });
      setIsModalOpen(false); // 모달 닫기
      setEditMode(false); // 수정 모드 종료
      fetchCertificates();  // 최신 자격증 목록을 가져옵니다.
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };
  
  
  //자격증 삭제 함수
  const handleDeleteSelected = async () => {
    const checkboxes = document.querySelectorAll('.certificateCheckbox:checked');

    // 체크박스 value를 읽어 배열로 변환
    const idsToDelete = Array.from(checkboxes)
    .map((checkbox) => checkbox.value.trim()) // 공백 제거
    .filter((id) => id); // 공백 또는 빈 값 제거
    
    if (idsToDelete.length === 0) {
      alert('삭제할 자격증을 선택하세요.');
      return;
    }
  
    try {
      // 여러 자격증 ID를 삭제 요청으로 전송
      const response = await fetch(`http://localhost:5000/api/ownDelCertificate`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsToDelete }), // IDs를 배열로 보냄
      });
  
      if (!response.ok) {
        throw new Error('삭제 실패');
      }
  
      
      fetchCertificates();  // 수정 후 UI로 반영
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };
  
  

  // 수정 버튼 클릭 시 모달 열기
  const handleEditClick = (certificate) => {
    setCurrentId(certificate.OWNED_CERT_ID);  // 수정할 항목의 ID 저장
    setNewCertificate({
      category: certificate.C_CERT_NAME,
      passDate: certificate.C_EXAM_DATE,
      validityPeriod: certificate.ACQISITION_DATE,
      remarks: certificate.OWN_INFO,
    }); // 모달에 수정할 데이터 채우기
    setIsModalOpen(true); // 모달 열기
    setEditMode(true); // 수정 모드 활성화
  };

  // 데이터 없을 때 출력할 메시지
  if (loading) {
    return <div>데이터 로딩 중...</div>;
  }

  // certificates.forEach((certificate) => {
  //   console.log('렌더링 중인 certificate ID:', certificate.OWNED_CERT_ID);
  // });

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
    certificates.map((certificate, index) => (
      <tr key={certificate.OWNED_CERT_ID || index}> {/* C_CERT_ID가 고유하지 않으면 index 사용 */}
        <td>
          <input
            type="checkbox"
            className="certificateCheckbox"
            value={certificate.OWNED_CERT_ID}
          />
        </td>
        <td><span>{certificate.C_CERT_NAME}</span></td>
        <td><span>{certificate.C_EXAM_DATE}</span></td>
        <td><span>{certificate.ACQISITION_DATE}</span></td>
        <td><span>{certificate.OWN_INFO}</span></td>
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
