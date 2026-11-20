const express = require('express');

const app = express();
app.use(require('./server/umi.server.js').default);
app.use(express.static('dist'));
app.listen(4234, '127.0.0.1', () => {
  console.log('Listening at http://127.0.0.1:4234');
});
