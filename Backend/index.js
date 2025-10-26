const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./src/config/db')
const path = require('path')
const port = 8000;

const route = require('./src/routers/index')

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


db.connect()

route(app)

// Start server
app.listen(port, () => {
  console.log(`✅ Backend chạy tại http://localhost:${port}`);
});
