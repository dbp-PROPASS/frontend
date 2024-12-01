import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/Certinfo/CertificateInfo.css';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';  // 추가
import 'react-toastify/dist/ReactToastify.css';  // 스타일 추가

const CertificateInfo = () => {
  const { certName } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [memId, setMemId] = useState(null);
  const sessionEmail = Cookies.get('rememberEmail'); // 이메일을 쿠키에서 가져옴

  // 자격증 정보 가져오기
  useEffect(() => {
    if (certName) {
      setIsLoading(true);

      fetch(`http://localhost:5000/api/certificate/${certName}`)
        .then((response) => response.json())
        .then((data) => {
          setCertificate(data);
        })
        .catch((error) => {
          console.error('Error fetching certificate info:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [certName]);

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

  // 즐겨찾기 상태 확인
  useEffect(() => {
    if (memId && certificate && certificate.ROUND_ID) {
      fetch(`http://localhost:5000/api/bookmark?mem_id=${memId}&round_id=${certificate.ROUND_ID}`)
        .then((response) => response.json())
        .then((data) => {
          setIsBookmarked(data.exists);
        })
        .catch((error) => {
          console.error('즐겨찾기 상태 확인 오류:', error);
        });
    }
  }, [memId, certificate]);

  // 즐겨찾기 상태 토글 처리
  const toggleBookmark = () => {
    if (!sessionEmail) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    setIsLoading(true);

    const url = isBookmarked
      ? `http://localhost:5000/api/bookmark/deleteBookmark?mem_id=${memId}&round_id=${certificate.ROUND_ID}`
      : `http://localhost:5000/api/bookmark/addBookmark`;

    const method = isBookmarked ? 'DELETE' : 'POST';

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mem_id: memId,
        round_id: certificate.ROUND_ID,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setIsBookmarked(!isBookmarked);
        if (isBookmarked) {
          toast.info('즐겨찾기가 해제되었습니다.', {
            autoClose: 800,         // 2초 후 사라짐
            hideProgressBar: true,  // 진행 표시줄 숨기기
          });
        } else {
          toast.success('즐겨찾기에 추가되었습니다.', {
            autoClose: 800,         // 2초 후 사라짐
            hideProgressBar: true,  // 진행 표시줄 숨기기
          });
        }
      })
      .catch((error) => {
        console.error('즐겨찾기 상태 업데이트 오류:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>자격증 정보를 불러오는 중입니다...</div>;
  }

  if (!certificate) {
    return <div>자격증 정보가 없습니다. 데이터를 다시 확인해주세요.</div>;
  }

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
              <a
                href="https://www.naver.com"
                target="_blank"
                className="img-link"
                rel="noopener noreferrer"
              >
                <div className="img">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5435/5435077.png"
                    alt="description"
                  />
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

      {/* ToastContainer를 추가하여 토스트 알림이 표시될 수 있도록 설정 */}
      <ToastContainer
       position="top-right"  // 오른쪽 상단
       style={{
         top: '100px',  // 기본 위치에서 조금 더 위로 이동
       }}
      />
    </div>
  );
};

export default CertificateInfo;
