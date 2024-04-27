const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

// const socketModule = require("./modules/socket");
const { createServer } = require("http");
// const { Server } = require("socket.io");
// const Comment = require("./models/comment");
const socketModule = require("./modules/socket");
const app = express();
const port = process.env.PORT || 8888;
app.use("/images", express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://192.168.0.103:3000"],
  })
);

dbConnect();
initRoutes(app);
const server = createServer(app);

socketModule(server);

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     credentials: true,
//     origin: ["http://localhost:3000", "http://192.168.0.103:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });
//---------------------------------------
// io.on("connection", (socket) => {
//   console.log(socket.id);
//   console.log(io.sockets.sockets.size);
//   socket.on("submit", async ({ id }) => {
//     const { isComic } = socket.handshake.query;
//     if (isComic === 'false') {
//       const comments = await Comment.find({ chapter: id }).populate(
//         "comic chapter user"
//       ).sort("-createdAt");
//       const count = comments.length;
//       const data = Array.from(comments).map((item) => {
//         return {
//           user: item.user.fullname,
//           avatar: item.user.avatar,
//           comic: item.comic.title,
//           chapter: item.chapter.chapNumber,
//           content: item.content,
//           createdAt: item.createdAt,
//         };
//       });
//       io.sockets.emit("refreshCmt", {
//         success: comments ? true : false,
//         count: count,
//         mes: comments ? data : "Something went wrong",
//       });
//     } else {
//       const comments = await Comment.find({ comic: id })
//         .populate("comic chapter user")
//         .sort("-createdAt");
//       const count = comments.length;
//       const data = Array.from(comments).map((item) => {
//         return {
//           user: item.user.fullname,
//           avatar: item.user.avatar,
//           comic: item.comic.title,
//           chapter: item.chapter?.chapNumber,
//           content: item.content,
//           createdAt: item.createdAt,
//         };
//       });
//       io.sockets.emit("refreshCmt", {
//         success: comments ? true : false,
//         count: count,
//         mes: comments ? data : "Something went wrong",
//       });
//     }
//   });
//   socket.on("disconnect", () => {
//     console.log("ngắt kết nối: " + socket.id);
//     console.log(io.sockets.sockets.size);
//   });
// });

//-------------------------------------
server.listen(port, () => {
  console.log("Server listening on port: " + port);
});
