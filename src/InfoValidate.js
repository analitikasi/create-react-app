import React, { useState } from 'react';
import './App.css';

function TableVal({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Section</th>
          <th>Section Validation</th>
          <th>Link Validation</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data.validation).map(([section, validation]) => (
          <tr key={section}>
            <td>{section}</td>
            <td>{validation.section_validation.validating_info}</td>
            <td>
              {validation.links_validation.map((link, index) => (
                <p key={index} style={{color: link.is_valid ? 'green' : 'red'}}>
                  {link.link_info}
                </p>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function InfoValidate() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set isLoading to true when the request starts

    const formData = new FormData(event.target);
    const response = await fetch('http://localhost:8080/api/v1/validate/documentation/openAi', {
      method: 'POST',
      body: formData
    })
    const jsonData = await response.json();
    setData(jsonData);

    setIsLoading(false); // Set isLoading to false when the request completes

  };

  return (
    <div className="InfoValidate">
      <div class="header">
        <h1>Provider Documentation Validation</h1>
      </div>

      <div class="topnav">
        <a href="/">Home</a>
        <a href="/info/openAi/validate">Documentation Validate</a>
        <a href="/info/openAi/generate">Documentation Generate</a>
        <a href="/connector/openAi/generate">Connector Generate</a>
        <a href="/generated/list">List Of Documentations</a>
      </div>

      <form id="myForm" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="systemName"></label>
        <p>System name:<input type="text" id="systemName" name="name" /></p>
        <label htmlFor="file">File:</label>
        <input id="file" name="file" type="file" />
        <button className="button" type="submit" disabled={isLoading}>Submit</button>
      </form>
      {data === null ? 'Waiting for data' : (
         <div>
         <TableVal data={data} />
         {/* ... rest of your code ... */}
       </div>
      )}
    </div>
  );
}

export default InfoValidate;
