const express = require('express');
const path = require('path');
const config = require('../webpack.config');

const PORT = 3000;

const app = express();
const indexHtml = path.join(process.cwd(), './dist/index.html');
app.use(express.static(path.join(process.cwd(), './dist')));

app.use('/healthcheck', (req, res) => res.sendStatus(200));
app.use(express.static(config.output.path));
app.get('*', (req, res) => res.sendFile(indexHtml));

app.listen(PORT, () =>
  console.info({ message: `App listening on port ${PORT}!` })
);
