import express from "express"
import mongoose from "mongoose";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();


app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", router)

mongoose.connect("mongodb+srv://RealEstate:RealEstate@realestate.n8dpbzv.mongodb.net/Auth?retryWrites=true&w=majority&appName=RealEstate").then(()=>{
    console.log("MongoDB is connected!");
}).catch(()=> {
    console.log("Db connection eror");
})

app.get("/", (req, res) => {
    res.send("server is active!")
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
})







console.log("hello");