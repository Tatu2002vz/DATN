const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const { createServer } = require("http");
const socketModule = require("./modules/socket");
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use("/images", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "*" 
    // ["http://localhost:3000", "http://192.168.0.105:3000"],
  })
);

dbConnect();
initRoutes(app);
const server = createServer(app);

socketModule(server);



//-------------------------------------
server.listen(port, () => {
  console.log("Server listening on port: " + port);
});
