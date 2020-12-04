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

app.post("/setting", async (req, res) => {
  try {
    const data = req.body
    const token = req.body.token
    io.to(token).emit('setting', {
      token,
      temp: parseFloat(data.tempurature),
      light: parseInt(data.light || 0),
      time: new Date()
    });
    res.json({
      success: true
    })
  } catch (error) {
    console.log("error while call /setting", error)
    res.status(500).json({
      success: false
    })
  }
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
  console.log(`${new Date()} Connected: ${socket.id}`);
  socket.on("sync", (data) => {
    const token = data.token
    socket.join(token)
    socket.join('client:' + token)
    socket.on("message", (data) => {
      console.log('message', data)
      io.to('client:' + token).emit('message', {
        token,
        temp: data.message,
        time: new Date()
      });
    })
    // setInterval(() => {
    //   console.log("room: ", token)
    //   io.to('client:' + token).emit('message', {
    //     token,
    //     // temp: TEMP[getRandomInt(3)],
    //     time: new Date()
    //   });
    // }, 5000);
  })
});