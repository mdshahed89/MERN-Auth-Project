import express from "express"
import { getUser, refreshToken, signIn, signOut, signUp, verifyToken } from "../controllers/auth.controller.js";

const router = express.Router()


router.post("/signup", signUp )
router.post("/signin", signIn)
router.get("/user", verifyToken, getUser)
router.get("/refresh", refreshToken, verifyToken, getUser)
router.post("/signout", signOut)


export default router