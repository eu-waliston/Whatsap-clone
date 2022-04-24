const express = require('express');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
require('./connectors/mongodb');
const route = require('./routes');
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'upload/'});
app.use(cors());

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(upload.single('profile_photo'))

// Routes for API
app.use('/', route);



const port = process.env.PORT || 5000;
app.listen(port);
