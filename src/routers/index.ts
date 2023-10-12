import signIn from "controller/signIn"
import express from "express"

const router = express.Router()

router.get("/", (req, res) => res.json({ message: "API route is working properly 🟢" }))
router.post("/signin", signIn)
router.all("*", (req, res) => res.status(404).json({ message: "Route not found" }))
export default router