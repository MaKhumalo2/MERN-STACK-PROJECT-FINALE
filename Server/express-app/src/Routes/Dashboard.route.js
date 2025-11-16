import express from "express";
import auth from "../middleware/auth.js";
import { summary } from "../Controllers/Dashboard.controller.js";

const router = express.Router();

router.get("/summary", auth, summary);

export default router;
