const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* Serve frontend */
app.use(express.static(path.join(__dirname, "../frontend")));

/* Test API */
app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "StyleHub API is running"
    });
});

/* Routes */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

/* Frontend */
app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );
});

/* MongoDB Connection */
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(error => {
        console.log("MongoDB connection error:", error.message);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`StyleHub running on http://localhost:${PORT}`);
});