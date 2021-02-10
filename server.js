const express = require("express");
const cors = require("cors");
const expressStatusMonitor = require("express-status-monitor");
const compression = require("compression");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const socket = require("socket.io");
const app = express();

app.use(cors());

app.use(expressStatusMonitor());

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

// app.get("/transfer", (req, res) => {
//   io.emit("transfer", {  time: new Date() })
//   res.json({
//     success: true
//   })
// });

// app.post("/setting", async (req, res) => {
//   try {
//     const data = req.body
//     const token = req.body.token
//     io.to(token).emit('message', {
//       ...data,
//       time: new Date()
//     });
//     res.json({
//       success: true
//     })
//   } catch (error) {
//     console.log("error while call /setting", error)
//     res.status(500).json({
//       success: false
//     })
//   }
// });

let server;
const port = process.env.PORT || 8080;

server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

const io = socket.listen(server);

io.on("connection", (socket) => {
  console.log(`${new Date()} Connected: ${socket.id}`);
  socket.on("sync", (data) => {
    const token = data.token
    socket.join(token)
    socket.on("message", (data) => {
      console.log('message', data)
      io.to(token).emit('display', {
        ...data,
        timestamp: new Date()
      });
    })
  })
});

// Graceful Shutdown
const gracefulShutdown = () => {
  console.info(
    "Got SIGTERM. Graceful shutdown start",
    new Date().toISOString()
  );
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit();
  });
  // if after
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit();
  }, 10 * 1000);
};

// listen for TERM signal .e.g. kill
process.on("SIGTERM", gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on("SIGINT", gracefulShutdown);