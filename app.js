const express = require("express");
const cors = require("cors");
const compression = require("compression");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const socket = require("socket.io");
const app = express();
const port = 8080;

app.use(cors());

app.use(
  compression({
    threshold: 512,
  })
);

app.use(bodyParser.json({
  limit: "5mb"
}));
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const io = socket.listen(server);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const TEMP = [35.7, 36.1, 39.4]

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);
  socket.on("sync", (data) => {
    console.log("data", data)    
    const token = data.token
    io.join(token)
    // io.emit(token, {
    //   token,
    //   temp: TEMP[getRandomInt(3)],
    //   time: new Date()
    // }); // This will emit the event to all connected sockets

    setInterval(() => {
      console.log("room: ", token)
      io.to(token).emit('message', {
        token,
        temp: TEMP[getRandomInt(3)],
        time: new Date()
      });
    }, 5000);
  })

});