import React, { useState, useEffect } from 'react';
import '../../styles/Schedule/Calendar.css';

/* 예시 일정 데이터 */
const calendarData = {
  '2024-09-13': [{ type: '시험일', description: '정보처리기사 시험일' }],
  '2024-09-23': [
    { type: '접수 시작', description: 'SQLD 접수 시작' },
    { type: '시험일', description: '정보처리기사 시험일' },
  ],
  '2024-09-29': [
    { type: '접수 시작', description: 'ADP 접수 시작' },
    { type: '시험일', description: '정보처리기사 시험일' },
    { type: '발표일', description: 'SQLD 발표일' },
    { type: '발표일', description: 'SQLD 발표일' },
    { type: '발표일', description: 'SQLD 발표일' }
  ],
  '2024-09-30': [{ type: '접수 마감', description: 'ADP 접수 마감' }],
};

const ScheduleManage = () => {
  // 오늘 날짜를 기준으로 초기 상태 설정
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // 현재 연도
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 현재 월 (0부터 시작)
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today
      .getDate()
      .toString()
      .padStart(2, '0')}`
  ); // 선택된 날짜, 기본값은 오늘 날짜

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열

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
    const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`; // yyyy-mm-dd 형식으로 날짜 포맷
    setSelectedDate(formattedDate); // 선택된 날짜 업데이트
  };

  // 캘린더를 생성하는 함수
  const renderCalendar = () => {
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
      const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`; // yyyy-mm-dd 형식
      const events = calendarData[formattedDate] || []; // 해당 날짜의 이벤트

      week.push(
        <td
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          className={`calendar-day ${selectedDate === formattedDate ? 'selected' : ''}`} // 선택된 날짜 스타일링
        >
          <div className="day-number">{day}</div> {/* 날짜 번호 */}
          <div className="event-markers">
            {events.slice(0, 2).map((event, index) => (
              <div
                key={`marker-${index}`}
                className="event-box"
                style={{ backgroundColor: `var(--marker-${event.type.replace(/\s/g, '-')})` }} // 타입에 따라 배경색 설정
              >
                {event.description}
              </div>
            ))}
            {events.length > 2 && (
              <div className="event-box more-events">+{events.length - 2} more</div> // 2개 초과 이벤트 표시
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
    while (week.length < 7) {
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
          {(calendarData[selectedDate] || []).map((event, index) => (
            <div
            key={index}
            className="event-box"
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
      </div>
    </div>
  );
};

export default ScheduleManage;
