import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Schedule/Calendar.css';

const ScheduleManage = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today
      .getDate()
      .toString()
      .padStart(2, '0')}`
  );

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/schedule', {}, { withCredentials: true });
        setCalendarData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    const date = new Date(year, month, 1);
    return date.getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const formattedDate = `${currentYear}/${(currentMonth + 1).toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}`;
    setSelectedDate(formattedDate);
  };

  const getUniqueEvents = (events) => {
    const seen = new Set();
    return events.filter((event) => {
      const key = `${event.date}-${event.type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const eventTypes = {
    expired: '만료일',
    writtenReceiveStart: '필기 접수 시작일',
    writtenReceiveEnd: '필기 접수 마감일',
    writtenResults: '필기 결과 발표일',
    writtenExamStart: '필기 시험 시작일',
    writtenExamEnd: '필기 시험 종료일',
    practicalReceiveStart: '실기 접수 시작일',
    practicalReceiveEnd: '실기 접수 마감일',
    practicalResults: '실기 결과 발표일',
    practicalExamStart: '실기 시험 시작일',
    practicalExamEnd: '실기 시험 종료일',
  };

  const eventDescription = (event) => (
    <>
      {event.certName} <br /> {eventTypes[event.type] || event.type}
    </>
  );

  const getEventsForDate = (date) => {
    const events = calendarData.filter(event => event.date === date);
    return getUniqueEvents(events).map(event => ({
      description: eventDescription(event),
      type: event.type,
    }));
  };

  const handleTodayClick = () => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
    setSelectedDate(formattedToday);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  };

  const renderCalendar = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div className="error-message">{error}</div>;
    }
  
    const daysInMonth = getDaysInMonth(currentYear, currentMonth); // 월의 일 수 계산
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth); // 첫 번째 요일
  
    const calendar = []; // 전체 캘린더를 담을 배열
    let week = []; // 한 주를 구성할 배열
  
    // 월 시작 전 비어 있는 셀 추가
    for (let i = 0; i < firstDay; i++) {
      week.push(<td key={`empty-start-${i}`}>&nbsp;</td>);
    }
  
    // 월의 각 날짜를 셀로 생성
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${currentYear}/${(currentMonth + 1).toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}`;
      const events = getEventsForDate(formattedDate);
  
      week.push(
        <td
          key={`day-${currentYear}-${currentMonth}-${day}`}
          onClick={() => handleDateClick(day)}
          className={`calendar-day ${selectedDate === formattedDate ? 'selected' : ''}`}
        >
          <div className="day-number">{day}</div>
          <div className="event-markers">
            {events.slice(0, 1).map((event, index) => (
              <div
                key={`marker-${day}-${index}`}
                className="event-box"
                style={{ backgroundColor: `var(--marker-${event.type.replace(/\s/g, '-')})` }}
              >
                {event.description}
              </div>
            ))}
            {events.length > 1 && (
              <div className="event-box more-events">+{events.length - 1} more</div>
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
  
    // 마지막 주의 남은 빈 셀 채우기
    while (week.length < 7) {
      week.push(<td key={`empty-end-${week.length}`}>&nbsp;</td>);
    }
  
    // 마지막 주가 공백으로만 채워져 있는지 확인
    const isLastWeekEmpty = week.every(
      (cell) => !cell.props.children || (typeof cell.props.children === 'string' && cell.props.children.trim() === '')
    );

    // 공백으로만 채워져 있지 않으면 마지막 주 추가
    if (!isLastWeekEmpty) {
      calendar.push(<tr key="last-week">{week}</tr>);
}
  
    return calendar; // 생성된 캘린더 반환
  };
  
  return (
    <div className="schedule-container">
      <div className="calendar">
        <div className="calendar-header">
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
      <div className="schedule-details">
      <div className="event-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--marker-expired)' }}></div>
          <span>만료일</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--marker-writtenReceiveStart)' }}></div>
          <span>접수 시작일</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--marker-writtenReceiveEnd)' }}></div>
          <span>접수 마감일</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--marker-writtenResults)' }}></div>
          <span>결과 발표일</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--marker-writtenExamStart)' }}></div>
          <span>시험 시작일</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'var(--marker-writtenExamEnd)' }}></div>
          <span>시험 종료일</span>
        </div>
      </div>
        <div className="detailBox">
          <h2>{selectedDate} 일정</h2>
          <div className="detailBox2">
            {getEventsForDate(selectedDate).map((event, index) => (
              <div
                key={index}
                className="event-box-detail"
                style={{ backgroundColor: `var(--marker-${event.type.replace(/\s/g, '-')})` }}
              >
                {event.description}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleTodayClick} className="today-button">
          오늘 날짜로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ScheduleManage;
