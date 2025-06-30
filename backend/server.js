const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo Error:", err));

app.use('/api/auth', require('./routes/auth'));
app.use("/uploads", express.static("uploads"));


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
