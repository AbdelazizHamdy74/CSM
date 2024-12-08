const joi=require('joi');

const userSchema=joi.object({
    id:joi.string().uuid(),
    company_id:joi.string().required().messages({
        'any.required': 'Company ID is required.',
    }),
    HrId:joi.string().required().messages({
        'any.required': 'HR ID is required.',
    }),
    name:joi.string().min(3).max(50).required().messages({
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name must be at most 50 characters long.',
        'any.required': 'Name is required.',
    }),
    phone:joi.string().pattern(/^\d{10,15}$/).required().messages({ 
        'string.pattern.base': 'Phone number must be between 10 to 15 digits',
        'any.required': 'Phone number is required.',
    }),

    email:joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.',
    }),

    password:joi.string().min(8).max(128).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/).required().messages({
      
        'string.pattern.base': 'Password must contain an uppercase letter, a lowercase letter, a number, and a special character',
        'string.min': 'Password must be at least 8 characters long.',
        'any.required': 'Password is required.',
    }),

    role:joi.string().valid("Admin", "Customer", "Support").required().messages({
        'any.only': 'User role must be either Customer, Support, or Admin .',
        'any.required': 'User role is required.',
    }),


    

});
module.exports= {userSchema};