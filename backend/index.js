const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/UserRoute");
dotenv.config()




// Middlware 
app.use(express.json());
app.use(cors());


app.use("/",UserRouter)

const PORT = process.env.PORT||3030;
app.listen(PORT,async() => {
    await connection
 console.log(`Srver is running ${PORT}`)
});
