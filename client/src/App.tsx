import logo from './logo.svg';
import './App.scss';
import type { SheetData } from '../../types/globals';

import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<SheetData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:2000/sheet-data'); // Adjust endpoint as needed
      const resJson: SheetData = await response.json();
      setData(resJson);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="sheet-data">
        {data && (
          <div>
            <h2>Data Response</h2> {/* Add your title here */}
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Using <pre> for better formatting */}
          </div>
        )}
        </div>
      </header>
    </div>
  );
}

export default App;
