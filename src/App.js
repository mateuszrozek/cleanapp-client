import React from 'react';
import './App.css';
import SimpleTable from './components/simpleTable';
import AreaTable from './components/areaTable';
import Title from './components/title';

function App() {
  return (
    <div className="App">
      <div className="TitleBox"><Title>CleanApp</Title></div>
      <div className="WeeksTable"><SimpleTable/></div>
      <div className="AreaTable"><AreaTable areaId={1}/></div>
    </div>
  );
}

export default App;
