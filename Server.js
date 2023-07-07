/* App Create */
const express = require('express');
const app = express();

/* PORT */
require('dotenv').config();
const PORT = process.env.PORT || 4000;

/* Middleware Addditon */
app.use(express.json()); /* to interact with JSON */
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

/* Connect to DB */
const db = require('./config/database');
db.connect();

/* Cloud Connect */
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

/* Mount API Route */
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload',Upload);

/* Activate Server */
app.listen(PORT, () => {
    console.log(`Connected to ${PORT}`);
})