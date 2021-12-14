const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./database/mongodbInit");

app.use(cors());
app.use(express.json());

const customerRoutes = require("./routes/customer.routes")
// const errorMiddleware = require("./middlewear/error");

app.get('/',(req,res)=>{
    res.send('everything good');
});
app.use(customerRoutes);
// app.use(errorMiddleware);


const PORT = process.env.PORT || 8001
app.listen(PORT,()=>{
    console.log(`Server lisning on http://localhost:${PORT}`)
})