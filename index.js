const express=require("express");
const dotEnv=require("dotenv");
const bodyParser=require('body-parser');

const connectDB = require("./config/db");

const vendorRoutes=require('./routes/vendorRoutes');
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes')
const path=require("path");

const app=express();

dotEnv.config();
connectDB();

const PORT=process.env.PORT || 4000;

app.use(bodyParser.json());

app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'));

app.listen(PORT,()=>{
    console.log(`server started and running at port ${PORT}`);
});

app.use('/home',(req,res)=>{
    res.send("<h1>Welcome to SUBY");
});
