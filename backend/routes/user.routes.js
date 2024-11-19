import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/", protectRoute, getUsersForSidebar);

export default router;
=======

router.get("/", protectRoute, getUsersForSidebar);

export default router;
>>>>>>> e2ac6dc (Add project code)
