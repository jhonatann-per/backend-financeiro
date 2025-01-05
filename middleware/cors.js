const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, X-PINGOTHER, Authorization'
};

module.exports = cors(corsOptions);
