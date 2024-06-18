import React, { useState } from 'react';

function ConnectorCode({ data }) {
  return (
    <div>
      <h2>Download Code</h2>
      <form action={`http://localhost:8080/file/code/${data.name}`} method = "get">
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
    const response = await fetch('http://localhost:8080/api/v1/provider/connector/openAi/generate', {
      method: 'POST',
      body: formData
    })
    const jsonData = await response.json();
    setData(jsonData);

    setIsLoading(false)

  }
  return <div className="ConnectorGenerate">
    <header>
      <h1>Connector Code Generation</h1>
    </header>
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
