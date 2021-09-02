const express = require("express");
const cors = require("cors");
const expressStatusMonitor = require("express-status-monitor");
const compression = require("compression");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const socket = require("socket.io");
const chalk = require('chalk');
const app = express();
const sequelize = require('./app/lib/sequelize');
const route = require("./app/route");
const {
  UserDeviceLog
} = require("./app/model");
require('dotenv').config();

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

app.use(morgan("dev"));

app.use('/api', route);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("Database has been sync");
  })
  .catch(error => console.log("Unable to sync to the database:", error));


let server;
const port = process.env.PORT || 8080;

server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

const io = socket.listen(server);

io.on("connection", (socket) => {
  console.log(`${new Date()} Connected: ${socket.id}`);
  socket.send("Hello!");
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on("sync", async (data) => {
    try {
      await UserDeviceLog.create({
        user_id: null,
        device_id: null,
        data: JSON.stringify(data),
        token: data.token
      })
    } catch (error) {
      console.log(chalk.white.bgRed.bold("error", error));
    }

  })
  socket.on("message", async (data) => {
    try {
      await UserDeviceLog.create({
        user_id: null,
        device_id: null,
        data: JSON.stringify(data),
        token: data.token
      })
    } catch (error) {
      console.log(chalk.white.bgRed.bold("error", error));
    }
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