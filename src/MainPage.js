import React from 'react';
import './App.css';

function MainPage() {
  return <div>

    <div class="header">
      <h1>Documentation Validation And Generation</h1>
    </div>

    <div class="topnav">
      <a href="/">Home</a>
      <a href="/info/openAi/validate">Documentation Validate</a>
      <a href="/info/openAi/generate">Documentation Generate</a>
      <a href="/connector/openAi/generate">Connector Generate</a>
      <a href="/generated/list">List Of Documentations</a>
    </div>

    <div class="row">
      <div class="column">
        <h2>Documentation Validate</h2>
        <p>Submit provider connector documentation in docx format to validate information. Your docx file need to contain next segments: 
        <ul>
          <li>provider documentation</li>
          <li>provider app creation</li>
          <li>authentication types</li>
          <li>list of api modules, objects or api categories</li>
          <li>rate limiting</li>
          <li>batch endpoints</li>
          <li>pagination</li>
          <li>errors</li>
          <li>miscellaneous</li>
        </ul>  
        Your document may be missing some sections, but that's not desirable</p>
        <form action="/info/openAi/validate">
          <button className="button" type="submit">Submit File</button>
        </form>
      </div>

      <div class="column">
        <h2>Generate File</h2>
        <p>Submit provider name to generate connector documentation in docx format. LLM generate next section about your provider
        <ul>
          <li>provider documentation</li>
          <li>provider app creation</li>
          <li>authentication types</li>
          <li>list of api modules, objects or api categories</li>
          <li>rate limiting</li>
          <li>batch endpoints</li>
          <li>pagination</li>
          <li>errors</li>
          <li>miscellaneous</li>
        </ul>  
        If you want, you can validate your documentation immediately
        </p>
        <form action="/info/openAi/generate">
          <button className="button" type="submit">Submit Name</button>
        </form>
      </div>

      <div class="column">
        <h2>Code Generation</h2>
        <p>Provide an example of the connector code and the name of the provider for which you want to generate a similar code</p>
        <form action="connector/openAi/generate">
          <button className="button" type="submit">Submint File</button>
        </form>
      </div>
    </div>
  </div>;
}

export default MainPage;
