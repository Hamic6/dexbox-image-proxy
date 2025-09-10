// image-proxy.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/img2base64', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url');
  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(404).send('Image not found');
    const buffer = await response.arrayBuffer();
    const mime = response.headers.get('content-type') || 'image/png';
    const base64 = Buffer.from(buffer).toString('base64');
    res.send(`data:${mime};base64,${base64}`);
  } catch (e) {
    res.status(500).send('Error fetching image');
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));