import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  deletePost,
  editPost,
  getImg,
  getImgById,
  postImg,
} from "../authController/user.post.js";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Define the directory where uploaded images will be stored
const uploadDir = join(__dirname, "../public/uploads");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create multer instance
const upload = multer({ storage: storage });

// Handle POST request to upload image
router.post("/post", upload.single("image"), postImg);

// Serve uploaded images statically
router.use("/uploads", express.static(uploadDir));

// Handle GET request to retrieve image
router.get("/post/", getImg);
router.get("/post/:id", getImgById);
router.patch("/post/:id", editPost);
router.delete("/post/delete/:id", deletePost);
export default router;
