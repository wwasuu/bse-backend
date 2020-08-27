const express = require("express");
const cors = require("cors");
const expressStatusMonitor = require("express-status-monitor");
const WebSocket = require("ws");
const compression = require("compression");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const socket = require("socket.io");
const app = express();
const port = 8080;

app.use(cors());

app.use(expressStatusMonitor());

app.use(
  compression({
    threshold: 512,
  })
);

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const webSocketServer = new WebSocket.Server({ server });
webSocketServer.on("connection", (webSocket) => {
  console.info("Total connected clients:", webSocketServer.clients.size);
   setInterval(() => {
    webSocketServer.emit("sync", {
      token: "mQPh6Zq6rC",
      type: "MEASURE",
      data: [
        {
          input: "GPIO4",
          value: 10,
        },
      ],
    });
   }, 5000)
});

// const io = socket.listen(server);

// io.on("connection", (socket) => {
//   console.log(`Connected: ${socket.id}`);
//   socket.on("sync", (data) => {
//     console.log("sync", data);
//   });

//   setInterval(() => {
//     io.emit("sync", {
//       token: "mQPh6Zq6rC",
//       type: "MEASURE",
//       data: [{
//         input: "GPIO4",
//         value: 10
//       }]
//     }); // This will emit the event to all connected sockets
//   }, 5000);
// });
