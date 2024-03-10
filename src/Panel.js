import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Panel({ setFileName, fileName, setNum }) {
  const [fileOptions, setFileOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [objectSize, setObjectSize] = useState('');
  const [saving, setSaving] = useState(false);

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
  }, [fileName]);

  const handleChange = event => {
    // Update the fileName state with the selected value
    setFileName(event.target.value);
  };

  const uploadFileToAPI = file => {
    // Create a FormData object
    const formData = new FormData();

    // Append the file to the FormData object with the specified key ('file')
    formData.append('file', file);

    // Make a POST request to the API endpoint
    fetch('http://localhost:3001/api/model', {
      method: 'POST',
      body: formData, // Set the FormData object as the request body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        return response.json(); // Assuming the server responds with JSON
      })
      .then(data => {
        // Handle the response data here
        console.log('File uploaded successfully:', data);

        // Assuming you want to set the uploaded file name after successful upload
        setFileName(file.name);
      })
      .catch(error => {
        // Handle any errors that occurred during the upload process
        console.error('Error uploading file:', error);
      });
  };

  const handleFileUpload = event => {
    const uploadedFile = event.target.files[0];
    // Call the function to upload the file to the API
    uploadFileToAPI(uploadedFile);
  };

  const handleSizeChange = event => {
    setObjectSize(event.target.value);
  };

  const handleSaveSize = () => {
    // Make an Axios call to save the object size
    setSaving(true);
    try{axios
      .put('http://localhost:3001/api/changeSize', {
        fileName,
        size: objectSize
      })
      .then(response => {
        console.log('Size saved successfully:', response.data);
        setSaving(false);
        setNum((prev)=>++prev);
      })
      .catch(error => {
        console.error('Error saving size:', error);
        setSaving(false);
      });} catch(e) {
        console.log(e);
      }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label htmlFor="fileSelect">Select a file:</label>
      <select id="fileSelect" onChange={handleChange}>
        {fileOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="fileUpload">Upload a file:</label>
      <input id="fileUpload" type="file" onChange={handleFileUpload} />
      <br />
      <label htmlFor="objectSize">Object size:</label>
      <input
        id="objectSize"
        type="text"
        value={objectSize}
        onChange={handleSizeChange}
      />
      <button onClick={handleSaveSize} disabled={saving}>
        {saving ? 'Saving...' : 'Save Size'}
      </button>
    </div>
  );
}

export default Panel;
