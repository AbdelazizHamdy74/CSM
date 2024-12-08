const usersController=require('./usersController');
const express=require('express');
const router=express.Router();

router.get('/',usersController.getAllUsers);
router.get('/:id',usersController.getUserById); 
router.get('/:email',usersController.getUserByEmail); 
router.patch('/:id',usersController.updateUser);
router.delete('/:id',usersController.deleteUser);

module.exports= router;