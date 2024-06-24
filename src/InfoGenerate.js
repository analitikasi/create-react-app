import React, { useState } from 'react';
import './App.css';

function TableVal({ data }) {
  return (
    <div>
    <h2>Download File</h2>
      <form action={`http://dev.sysintit.kz:8080/api/v1/file/documentation/${data.name}`} method = "get">
      <button className="button" type="submit">Download File</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Section</th>
          <th>Generation</th>
          {data.is_validated && <th>Section Content Validation</th>}
          {data.is_validated && <th>Section Link Validation</th>}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data.sections).map(([section, content]) => (
          <tr key={section}>
            <td>{section}</td>
            <td>{content.generation}</td>
            {data.is_validated && <td>{content.validation.section_validation.validating_info}</td>}
            {data.is_validated &&  <td>
              {content.validation.links_validation.map((link, index) => (
                <p key={index} style={{color: link.is_valid ? 'green' : 'red'}}>
                  {link.link_info}
                </p>
              ))}
            </td>}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

function InfoGenerate() {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event, validate) => {
    event.preventDefault();
    setIsLoading(true); // Set isLoading to true when the request starts

    const response = await fetch(`http://dev.sysintit.kz:8080/api/v1/generate/documentation/openAi?name=${name}&validate=${validate}`);
    const jsonData = await response.json();
    setData(jsonData);
    console.log(jsonData)

    setIsLoading(false); // Set isLoading to false when the request completes

  };

  return (
    <div className="InfoGenerate">
      <div class="header">
        <h1>Provider Documentation Generation</h1>
      </div>

      <div class="topnav">
        <a href="/">Home</a>
        <a href="/info/openAi/validate">Documentation Validate</a>
        <a href="/info/openAi/generate">Documentation Generate</a>
        <a href="/connector/openAi/generate">Connector Generate</a>
        <a href="/generated/list">List Of Documentations</a>

      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="systemName"></label>
        <p>System Name:<input type="text" id="systemName" name="name" value={name} onChange={(e) => setName(e.target.value)} /></p>
        <button className="button" type="button" onClick={(e) => handleSubmit(e, true)} disabled={isLoading}>Validate</button>
        <button className="button" type="button" onClick={(e) => handleSubmit(e, false)} disabled={isLoading}>Generate</button>
      </form>
      {data === null ? 'Waiting for data' : (
        <div>
          <TableVal data={data} />
        </div>
      )}
    </div>
  );
}

export default InfoGenerate;
