const contractController=require('./contractController');
const express = require('express');
const router = express.Router();

router.get('/',contractController.getAllContracts);


module.exports=router