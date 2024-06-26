import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import InfoGenerate from './InfoGenerate';
import InfoValidate from './InfoValidate';
import ConnectorGenerate from './ConnectorGenerate';
import GetDocumentation from './GetDocumentation';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/info/openAi/generate" element={<InfoGenerate />}/>
        <Route exact path="/info/openAi/validate" element={<InfoValidate />}/>
        <Route exact path="/connector/openAi/generate" element={<ConnectorGenerate />}/>
        <Route exact path="/generated/list" element={<GetDocumentation />}/>
      </Routes>
    </Router>
  );
}

export default App;



