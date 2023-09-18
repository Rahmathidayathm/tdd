// index.js
const express = require("express");
const mongoose = require("mongoose");

// Koneksi ke database MongoDB
const mongoClient = new mongoose.MongoClient("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Load controller
  require("./controllers/invoice.controller");
  require("./controllers/bank.controller");

  // Buat endpoint API
  const app = express();

  // Hubungkan API bank controller
  app.use("/banks", require("./controllers/bank.controller"));

  // Hubungkan API invoice controller
  app.use("/invoices", require("./controllers/invoice.controller"));

  // Jalankan server
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});