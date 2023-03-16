const express = require('express');
const cors = require('cors');
const data = require('./MeNow_product_task.json');
const fs = require('fs');
function convertDriveUrl(url) {
    const idPattern = /\/file\/d\/(.+?)\//;
    const match = url.match(idPattern);
  
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/uc?id=${fileId}`;
    }
  
    return null;
  }
const app = express();
app.use(cors());

app.get('/random-images', (req, res) => {
  const randomImages = [];
  randomImages.length=0;
  // Select five random images
  while (randomImages.length < 5) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomImage = data[randomIndex];
    if(!randomImages.includes(randomImage)){
        randomImages.push(randomImage);
    }
  }
  
  // Send the selected images to the client
  const response = randomImages.map(image => ({
    path: convertDriveUrl(image.path),
    id: image.id
  }));
  res.json(response);
});

app.get('/max-images', (req, res) => {
    const sorted=data.sort((a,b)=>b.score-a.score);
    const newSorted=sorted.slice(0,5);

    // Send the selected images to the client
    const response = newSorted.map(image => ({
      path: convertDriveUrl(image.path),
      id: image.id
    }));
    res.json(response);
  });
  app.get('/search-images', (req, res) => {
    const keyword = req.query.keyword;
    
    // Filter the images that match the keyword and sort them by score
    const matchedImages = data.filter(image => image.score > 0 && image.keywords.includes(keyword))
                             .sort((a, b) => b.score - a.score)
                             .slice(0, 5);
  
    // Send the matched images to the client
    const response = matchedImages.map(image => ({
      path: convertDriveUrl(image.path),
      id: image.id
    }));
    res.json(response);
  });

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
