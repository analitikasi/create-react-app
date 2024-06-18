import React, { useState, useEffect } from 'react';

function InfoValidateFetch() {
  const [data, setData] = useState(null);
  
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/provider/info/openAi/validate', {
      method: 'POST',
      body: new FormData(document.getElementById('myForm'))
    })
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error:', error));
  }, []);

  if (data === null) {
    return 'Loading...';
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default InfoValidateFetch;
