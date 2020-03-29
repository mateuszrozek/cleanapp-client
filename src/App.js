import React, { useState } from 'react';
import './App.css';
import SimpleTable from './components/simpleTable';
import AreaTable from './components/areaTable';
import Title from './components/title';

function App() {

  const [areaId, setAreaId] = useState(0);

  function handleChildClick(dataFromChild) {
    setAreaId(dataFromChild);
    console.log(areaId);
  }

  return (
    <div className="App">
      <div className="TitleBox"><Title>CleanApp</Title></div>
      <div className="WeeksTable"><SimpleTable onChildClick={handleChildClick} /></div>
      <div className="AreasTable"><AreaTable clickedAreaId={areaId} /></div>
    </div>
  );
}

export default App;
