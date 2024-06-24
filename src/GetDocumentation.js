import React, { useState, useEffect } from 'react';
import './App.css';

function GetDocumentation() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://dev.sysintit.kz:8080/api/v1/documentation', {
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
                    {data.documentation.map((item, index) => (
                        <div key={index}>
                            <h1>{item.provider_name}</h1>
                            <h2>Model {item.llm_model}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Section</th>
                                        <th>Generation</th>
                                        {item.is_validated && (
                                            <>
                                                <th>Validation</th>
                                                <th>Link Validation </th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(item.doc).map((section) => (
                                        <tr key={section}>
                                             <td>{section}</td>
                                            <td>{item.doc[section]}</td>
                                            {item.is_validated && (
                                                <React.Fragment>
                                                    <td>{item.validation[section].section_validation.validating_info}</td>
                                                    <td>{item.validation[section].links_validation.map((link, index) => (
                                                        <div key={index}>
                                                            <p>{link.link_info}</p>
                                                        </div>
                                                    ))}</td>
                                                </React.Fragment>
                                            )}
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