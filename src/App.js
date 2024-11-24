import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar'
import AppRoutes from './routes/routes'

function App() {
  const [data, setData] = useState([]); // 데이터를 상태로 저장

  useEffect(() => {
    // API 호출
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data)) // 데이터를 받아서 상태 업데이트
      .catch(error => console.error('Error fetching data:', error));
  }, []); // 컴포넌트가 처음 렌더링될 때만 호출

  return (
    <div className="App">
      <Navbar/>
      <AppRoutes data={data} />
    </div>
  );
}

export default App;
