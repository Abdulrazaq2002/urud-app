import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRouter from "./request/request.js";
import PostRouter from "./request/post.req.js";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
dotenv.config();

const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));
// connection to bakend/mongodb

mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get("/", (req, res) => {
  res.send("Hello From New App UploadFiless");
});

app.listen(PORT, () => {
  console.log(`web app running on port : ${PORT}`);
});

// Authentication
app.use("/api", AuthRouter);
app.use("/api", PostRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
