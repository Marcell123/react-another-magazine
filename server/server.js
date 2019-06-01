const path = require('path');
const express = require('express');

const DIST_DIR = path.join(__dirname, '../build');

const app = express();
app.use(express.static(DIST_DIR)) // absolute or relative to CWD

const port = 8001;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});