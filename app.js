const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoutes(io));
app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

module.exports = { app, server };

