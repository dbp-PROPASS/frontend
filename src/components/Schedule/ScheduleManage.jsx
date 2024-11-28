import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Schedule/Calendar.css';

// const calendarData = [
//   { certName: '정보처리 기사', date: '2024/11/13', type: 'exam' },
//   { certName: 'SQLD', date: '2024/11/23', type: 'receiveStart' },
//   { certName: '정보처리 기사', date: '2024/11/23', type: 'exam' },
//   { certName: 'ADP', date: '2024/11/29', type: 'receiveStart' },
//   { certName: '정보처리 기사', date: '2024/11/29', type: 'exam' },
//   { certName: 'SQLD', date: '2024/11/29', type: 'results' },
//   { certName: 'SQLD', date: '2024/11/29', type: 'results' },
//   { certName: 'SQLD', date: '2024/11/29', type: 'results' },
//   { certName: 'ADP', date: '2024/11/30', type: 'receiveEnd' }
// ];

const ScheduleManage = () => {
  const [calendarData, setCalendarData] = useState([]); // 일정 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // 오늘 날짜를 기준으로 초기 상태 설정
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // 현재 연도
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 현재 월 (0부터 시작)
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today
      .getDate()
      .toString()
      .padStart(2, '0')}`
  ); // 선택된 날짜, 기본값은 오늘 날짜

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열

  // 백엔드에서 일정 데이터를 가져오는 함수
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/schedule', {}, { withCredentials: true });
        const data = response.data;

        setCalendarData(response.data);
        console.log('response', response);
        console.log('response Data:', response.data);
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
        setLoading(false); // 로딩 완료 (오류 상태에서도)
      }
    };

    fetchScheduleData();
  }, []);
  
  // 특정 연도와 월의 일 수를 계산하는 함수
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month + 1, 0); // 해당 월의 마지막 날짜
    return date.getDate(); // 마지막 날짜의 일(day) 반환
  };

  // 특정 연도와 월의 첫 번째 요일(0~6)을 반환
  const getFirstDayOfMonth = (year, month) => {
    const date = new Date(year, month, 1); // 해당 월의 첫째 날
    return date.getDay(); // 첫째 날의 요일 반환
  };

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      // 1월에서 이전 달로 이동하면 전년도 12월로 변경
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1); // 그 외에는 이전 월로 이동
    }
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      // 12월에서 다음 달로 이동하면 다음 년도의 1월로 변경
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1); // 그 외에는 다음 월로 이동
    }
  };

  // 특정 날짜를 클릭했을 때 선택된 날짜를 설정하는 함수
  const handleDateClick = (day) => {
    const formattedDate = `${currentYear}/${(currentMonth + 1).toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}`; // yyyy-mm-dd 형식으로 날짜 포맷
    setSelectedDate(formattedDate); // 선택된 날짜 업데이트
  };

  // 특정 날짜에 해당하는 이벤트를 필터링하는 함수
  const getEventsForDate = (date) => {
    return calendarData
      .filter(event => event.date === date)
      .map(event => {
        let description;

        switch (event.type) {
          case 'expired':
            description = (
              <>
                {event.certName} <br /> 만료일
              </>
            );
            break;
          case 'exam':
            description = (
              <>
                {event.certName} <br /> 시험일
              </>
            );
            break;
          case 'receiveStart':
            description = (
              <>
                {event.certName} <br /> 접수 시작일
              </>
            );
            break;
          case 'receiveEnd':
            description = (
              <>
                {event.certName} <br /> 접수 마감일
              </>
            );
            break;
          case 'results':
            description = (
              <>
                {event.certName} <br /> 결과 발표일
              </>
            );
            break;
          default:
            description = (
              <>
                {event.certName} <br /> {event.type}
              </>
            );
        }

        return {

          description: description,
          type: event.type
        };
      });
  };

  const handleTodayClick = () => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
    setSelectedDate(formattedToday); // 선택된 날짜를 오늘 날짜로 설정
    setCurrentYear(today.getFullYear()); // 연도를 오늘 연도로 설정
    setCurrentMonth(today.getMonth()); // 월을 오늘 월로 설정
  };

  // 캘린더를 생성하는 함수
  const renderCalendar = () => {
    if (loading) {
      return <div>Loading...</div>; // 로딩 중 메시지
    }

    const daysInMonth = getDaysInMonth(currentYear, currentMonth); // 해당 월의 일 수
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth); // 해당 월의 시작 요일

    const calendar = []; // 캘린더 전체를 담을 배열
    let week = []; // 한 주를 구성할 배열

    // 월 시작 전 비어있는 셀 추가
    for (let i = 0; i < firstDay; i++) {
      week.push(<td key={`empty-start-${i}`}>&nbsp;</td>); // 공백 셀 추가
    }

    // 월의 각 날짜를 셀로 생성
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${currentYear}/${(currentMonth + 1).toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}`; // yyyy-mm-dd 형식
        const events = getEventsForDate(formattedDate); // 해당 날짜의 일정 

      week.push(
        <td
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          className={`calendar-day ${selectedDate === formattedDate ? 'selected' : ''}`} // 선택된 날짜 스타일링
        >
          <div className="day-number">{day}</div> {/* 날짜 번호 */}
          <div className="event-markers">
            {events.slice(0, 1).map((event, index) => (
              <div
                key={`marker-${index}`}
                className="event-box"
                style={{ backgroundColor: `var(--marker-${event.type.replace(/\s/g, '-')})` }} // 타입에 따라 배경색 설정
              >
                {event.description}
              </div>
            ))}
            {events.length > 1 && (
              <div className="event-box more-events">+{events.length - 1} more</div> // 2개 초과 이벤트 표시
            )}
          </div>
        </td>
      );

      // 주 단위로 행을 생성
      if (week.length === 7) {
        calendar.push(<tr key={`week-${day}`}>{week}</tr>);
        week = []; // 새로운 주 시작
      }
    }

    // 마지막 주의 남은 빈 셀 추가
    while (week.length < 7 && week.length > 0) {
      week.push(<td key={`empty-end-${week.length}`}>&nbsp;</td>);
    }
    calendar.push(<tr key="last-week">{week}</tr>); // 마지막 주 추가

    return calendar; // 생성된 캘린더 반환
  };

  return (
    <div className="schedule-container">
      {/* 캘린더 섹션 */}
      <div className="calendar">
        <div className="calendar-header" style={{ fontSize: "30px" }}>
          <button onClick={handlePrevMonth}>◀</button> 
          <span>
            {currentYear}년 {currentMonth + 1}월 
          </span>
          <button onClick={handleNextMonth}>▶</button> 
        </div>
        <table>
          <thead>
            <tr>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th> 
              ))}
            </tr>
          </thead>
          <tbody>{renderCalendar()}</tbody> 
        </table>
      </div>

      {/* 일정 세부사항 섹션 */}
      <div className="schedule-details">
        <div className='datailBox1'>
        <h2>{selectedDate} 일정</h2> {/* 선택된 날짜 표시 */}
        </div>
        <div className='detailBox2'>
        <ul>
         {getEventsForDate(selectedDate).map((event, index) => (
            <div
            key={index}
            className="event-box-detail"
            style={{
              backgroundColor: `var(--marker-${event.type.replace(/\s/g, '-')})`,
              marginBottom: '10px'
            }}
          >
              {event.description}
            </div>
          ))}
        </ul>
        </div>
        <button onClick={handleTodayClick} className="today-button">
          오늘 날짜로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ScheduleManage;