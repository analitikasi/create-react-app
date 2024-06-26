import React, { useState } from 'react';

function ConnectorCode({ data }) {
  return (
    <div>
      <h2>Download Code</h2>
      <form action={`http://dev.sysintit.kz:8080/api/v1/file/code/${data.name}`} method = "get">
        <button className="button" type="submit">Download Code</button>
      </form>

      <div className="Code">
        <pre>
          {data.code}
       </pre>
      </div>
    </div>
  )
}

function ConnectorGenerate() {
  const [data, setData] =useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.target);
    const response = await fetch('http://dev.sysintit.kz:8080/api/v1/generate/code/openAi', {
      method: 'POST',
      body: formData
    })
    const jsonData = await response.json();
    setData(jsonData);

    setIsLoading(false)

  }
  return <div className="ConnectorGenerate">
    <div class="header">
      <h1>Connector Code Generation</h1>
    </div>

    <div class="topnav">
        <a href="/">Home</a>
        <a href="/info/openAi/validate">Documentation Validate</a>
        <a href="/info/openAi/generate">Documentation Generate</a>
        <a href="/connector/openAi/generate">Connector Generate</a>
        <a href="/generated/list">List Of Documentations</a>

      </div>

    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="systemName"></label>
      <p>System Name:<input type="text" id="systemName" name="name" /></p>
      <label htmlFor="file">File</label>
      <input id="file" name="file" type="file" />
      <button className="button" type="submit" disabled={isLoading}>Submit</button>
    </form>
    {data === null ? 'Waiting for data' : (
      <div>
        <ConnectorCode data={data} /> 
      </div>
    )}
  </div>;
}

export default ConnectorGenerate;
