// server.js
const path = require('path');
const express = require('express');

const app = express();

// Portti
const PORT = process.env.PORT || 3000;

// Staattiset tiedostot
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Sivureitit
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(publicDir, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(publicDir, 'contact.html'));
});

// API
app.get('/api/time', (req, res) => {
  const now = new Date();
  res.json({ now: now.toISOString(), epochMs: now.getTime() });
});

// 404
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(publicDir, '404.html'));
});

// 500
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500);
  res.sendFile(path.join(publicDir, '500.html'));
});

// KUUNTELE PORTTIA — app pitää olla näkyvissä tässä tiedoston tasolla
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});