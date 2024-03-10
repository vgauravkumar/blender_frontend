import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Panel({ setFileName, fileName, setScale, setPosition }) {
  const [fileOptions, setFileOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [objectSize, setObjectSize] = useState('');
  const [objectPosition, setObjectPosition] = useState('');
  const [saving, setSaving] = useState(false);

  console.log({ fileName });

  useEffect(() => {
    const handleEffect = async () => {
      console.log("panel use effect called!!!");
      // Fetch model names from API when component mounts
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/models');
        console.log({ response });
        const { arr } = response.data;
        const fileNames = arr.map(item => item.file_name);
        console.log("fileNames", fileNames);
        setFileOptions(fileNames);
        setLoading(false);
      } catch (err) {
        console.log("Error while fetching filenames:", err);
        setLoading(false);
      }
    }
    handleEffect();
  }, [fileName]);

  const handleChange = event => {
    console.log("event:", event.target.value);
    // Update the fileName state with the selected value
    setFileName(event.target.value);
    console.log("event2:", event.target.value);
  };

  const uploadFileToAPI = async (file) => {
    // Create a FormData object
    const formData = new FormData();

    // Append the file to the FormData object with the specified key ('file')
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/model', {
        method: 'POST',
        body: formData, // Set the FormData object as the request body
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      console.log("response", response);
      const data = await response.json(); // Assuming the server responds with JSON

      // Handle the response data here
      // console.log('File uploaded successfully:', data);

      // Assuming you want to set the uploaded file name after successful upload
      console.log("file.name", file.name);
      setFileName(file.name);
    } catch (error) {
      // Handle any errors that occurred during the upload process
      console.error('Error uploading file:', error);
    }

  };

  const handleFileUpload = event => {
    const uploadedFile = event.target.files[0];
    // Call the function to upload the file to the API
    uploadFileToAPI(uploadedFile);
  };

  const handleSizeChange = event => {
    setObjectSize(event.target.value);
  };

  const handleObjectPosition = event => {
    setObjectPosition(event.target.value);
  };

  const handleSaveSize = () => {
    // Make an Axios call to save the object size
    setSaving(true);
    try {
      axios
        .put('http://localhost:3001/api/changeSize', {
          fileName,
          size: objectSize
        })
        .then(response => {
          console.log('Size saved successfully:', response.data);
          setSaving(false);
          setScale(objectSize);
        })
        .catch(error => {
          console.error('Error saving size:', error);
          setSaving(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSavePosition = async () => {
    // Make an Axios call to save the object size
    setSaving(true);
    try {
      await axios
        .put('http://localhost:3001/api/changePosition', {
          fileName,
          position: objectPosition
        })
        .then(response => {
          console.log('Size saved successfully:', response.data);
          setSaving(false);
          setPosition(objectPosition);
        })
        .catch(error => {
          console.error('Error saving size:', error);
          setSaving(false);
        });
    } catch (e) {
      console.log(e);
      setSaving(false);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {loading ?
        <div>Loading...</div>
        : <div>
          <label htmlFor="fileSelect">Select a file:</label>
          <select id="fileSelect" onChange={handleChange} value={fileName}>
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

          <label htmlFor="objectSize">Object scale:</label>
          <input
            id="objectSize"
            type="text"
            value={objectSize}
            onChange={handleSizeChange}
          />
          <button onClick={handleSaveSize} disabled={saving}>
            {saving ? 'Saving...' : 'Save Size'}
          </button>

          <br />
          <label htmlFor="objectPosition">Object position:</label>
          <input
            id="objectPosition"
            type="text"
            value={objectPosition}
            onChange={handleObjectPosition}
          />
          <button onClick={handleSavePosition} disabled={saving}>
            {saving ? 'Saving...' : 'Save Position'}
          </button>
        </div>}
    </>
  );
}

export default Panel;
