import mongoose from "mongoose";
require("dotenv").config({ path: "variables.env" });

const connectDB = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(
        console.log("DB conectada")
    ).catch(err => console.log(err))
}
module.exports = connectDB;