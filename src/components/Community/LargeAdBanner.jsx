import React from 'react';
import '../../styles/Community/LargeAdBanner.css';

const LargeAdBanner = () => (
  <div className="large-ad-banner">
    <h2>취업은 어디서? "잡플래닛"</h2>
    <p>내가 취업하려는 회사의 평균 연봉은 얼마일까?</p>
    <button
      onClick={() => window.open('https://www.jobplanet.co.kr/companies/cover', '_blank')}
      className="ad-button"
    >
      기업랭킹 보러가기
    </button>
  </div>
);

export default LargeAdBanner;
