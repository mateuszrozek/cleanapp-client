import React from 'react';
import './App.css';
import WeekTable from './components/weekTable';
import Title from './components/title';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div className="TitleBox"><Title/></div>
        <div className="WeekTable"><WeekTable /></div>
      </div>
    );
  }
}
