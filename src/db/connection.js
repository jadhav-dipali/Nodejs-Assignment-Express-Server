const mongoose = require("mongoose")
require("dotenv").config();

mongoose.connect(process.env.DB_URL)
.then("connection successful...")
.catch("connection not Success...")