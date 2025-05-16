import express from "express";
 import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { fetchAndSummarizeChat, getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route('/send/:id').post(isAuthenticated,upload.single('Picture'), sendMessage);
router.route('/all/:id').get(isAuthenticated, getMessage);
router.route("/chat/summarize-with/:otherUserId").post(isAuthenticated, fetchAndSummarizeChat); 

export default router;