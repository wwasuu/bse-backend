const express = require("express");
const http = require("http");
const socket = require("socket.io");
const app = express();
const port = 80;

const server = http.createServer(app);
const io = socket.listen(server);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

io.emit("event", {
  node: "A13",
}); // This will emit the event to all connected sockets

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
