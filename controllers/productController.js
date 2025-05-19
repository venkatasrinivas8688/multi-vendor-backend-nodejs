const Product=require('../models/Product');
const Firm=require('../models/Firm')
const multer=require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save files in the uploads folder
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });


  const addProduct=async(req,res)=>{
    try {const {productName,price,category,bestSeller,description}=req.body

        const image=req.file?req.file.filename:undefined;

        const firmId=req.params.firmId 
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:'No Firm Found'})
        }
        const product=new Product({
            productName,price,category,bestSeller,description,image,firm:firm._id
        })
        const savedProduct=await product.save();
        firm.product.push(savedProduct)
        await firm.save();
        res.status(200).json({savedProduct})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Internal server error'})
    }
  }

const getProductByFirm=async(req,res)=>{
  try{
    const firmId=req.params.firmId;
    const firm=await Firm.findById(firmId);
    if(!firm){
      return res.status(404).json({error:"No firm found"});
    }
    const restaturantName=firm.firmName;

    const products=await Product.find({firm:firmId});
    res.status(200).json({restaturantName,products});
  }catch(error){
    console.error(error);
    res.status(500).json({error:'Internal server error'});
  }
}

const deleteProductById=async(req,res)=>{
  try {
    const productId=req.params.id;
    const deletedProduct=await Product.findByIdAndDelete(productId);
    if(!deletedProduct){
      return res.status(400).json({error:"no product found"})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({error:'internal server error'})
  }
}
  module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}