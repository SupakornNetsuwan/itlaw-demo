import express from "express"
import cors from "cors"
import routers from "./routers"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3001

app.use("/api", routers)

app.listen(port, () => {

    console.log(`Server is running on ${port} 🎉`)
})

