import React, { useState, useEffect } from 'react';
import './App.css';

function GetDocumentation() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/documentation', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(jsonData => setData(jsonData))
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <div className="header">
                <h1>List Of Documentations</h1>
            </div>

            <div className="topnav">
                <a href="/">Home</a>
                <a href="/info/openAi/validate">Documentation Validate</a>
                <a href="/info/openAi/generate">Documentation Generate</a>
                <a href="/connector/openAi/generate">Connector Generate</a>
                <a href="/generated/list">List Of Documentations</a>
            </div>
            {data == null ? "No data" : (
                <div> 
                    {data.map((item, index) => (
                        <div key={index}>
                            <h1>{item.ProviderName}</h1>
                            <h2>Model {item.LLMModel}</h2>
                            <form action={`http://localhost:8080/api/v1/file/documentation/${item.ProviderName}`} method = "get">
                                <button className="button" type="submit">Download File</button>
                            </form>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Section</th>
                                        <th>Generation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(item.Text).map(([section, generation]) => (
                                        <tr key={section}>
                                             <td>{section}</td>
                                            <td>{generation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GetDocumentation;