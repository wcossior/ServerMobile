import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import router from "./routes";
import connectDB from "./config/db";

//conexion a la base de datos MongoDB
connectDB();

const app = express();
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use("/api", router);


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});