const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const caseRoutes = require("./routes/caseRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cors("*"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api", caseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Crime Record System API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
