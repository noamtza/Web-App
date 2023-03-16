import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [randomImages, setRandomImages] = useState([]);
  const [searchImages, setSearchImages] = useState([]);
  const [keyword, setKeyword] = useState('');

  const getRandomImages = async () => {
    setRandomImages([]);
    try {
      const response = await axios.get('http://localhost:5000/random-images');
      setRandomImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchImagesByKeyword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/search-images?keyword=${keyword}`);
      setSearchImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="button-container">
      <button onClick={getRandomImages}>Random Images</button>
      <h2>  </h2>
      {randomImages.map((image) => (
        <img key={image.id} src={image.path} alt={`Image ${image.id}`} width="80" height="80"/> 
      ))}

      <h2>Images by Keyword</h2>
      <form onSubmit={searchImagesByKeyword}>
        <input type="text" name="keyword" placeholder="Enter keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {searchImages.map((image) => (
        <img key={image.id} src={image.path} alt={`Image ${image.id}`} width="80" height="80"/> 
      ))}
    </div>
    )}
export default App
