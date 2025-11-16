import express from "express";
import auth from "../middleware/auth.js";
import {
  logActivity,
  listActivities,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/", auth, logActivity);
router.get("/", auth, listActivities);

export default router;
