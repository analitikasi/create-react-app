import React from 'react';
import './App.css';

function MainPage() {
  return <div className="MainPage">
    <h1>Documentation Validation And Generation</h1>
    <h2>Validate File</h2>
    <form action="/info/openAi/validate">
      <button className="button" type="submit">Submit File</button>
    </form>
    <h2>Generate File</h2>
    <form action="/info/openAi/generate">
      <button className="button" type="submit">Submit Provider Name</button>
    </form>
    <h2>Connector Code Generation</h2>
    <form action="connector/openAi/generate">
      <button className="button" type="submit">Generate Connector</button>
    </form>
  </div>;
}

export default MainPage;
