const vendorController=require("../controllers/vendorController");
const express=require("express");

//inbuilt route

const router=express.Router();

router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.get("/all-vendors",vendorController.getAllVendors)
router.get("/single-vendor/:id",vendorController.getVendorById)
module.exports=router;