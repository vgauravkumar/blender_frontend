import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Panel({ setFileName }) {
  const [fileOptions, setFileOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Fetch model names from API when component mounts
    axios.get('http://localhost:3001/api/models')
      .then(response => {
        const { arr } = response.data;
        const fileNames = arr.map(item => item.file_name);
        setFileOptions(fileNames);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching file names:', error);
        setLoading(false);
      });

  }, []);

  const handleChange = (event) => {
    // Update the fileName state with the selected value
    setFileName(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label htmlFor="fileSelect">Select a file:</label>
      <select id="fileSelect" onChange={handleChange}>
        {fileOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Panel;
