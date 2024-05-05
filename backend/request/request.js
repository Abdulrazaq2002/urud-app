import express from "express";
import {
  acDelete,
  editUser,
  getSignin,
  postLogout,
  postSignin,
  postlogin,
} from "../authController/user.auth.js";

const router = express.Router();

router.get("/signin", getSignin);
router.post("/signin", postSignin);
router.post("/login", postlogin);
router.post("/logout", postLogout);
router.patch("/signin/:id", editUser);
router.delete("/delete/:id", acDelete);

export default router;
