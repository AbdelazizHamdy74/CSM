const express=require('express')
const {authenticate}=require('../../utlis/middleware/authenticate')
const {authorize}=require('../../utlis/middleware/authorization')
const controller=require('./authController')

const router=express.Router();

router.post('/register',controller.register,authenticate,authorize(['Admin','Support']));
router.post('/login',controller.login);
router.post('/logout',controller.logout);

module.exports = router;