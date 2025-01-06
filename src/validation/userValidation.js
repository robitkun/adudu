import Joi from 'joi';

const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username can be at most 30 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters long',
  }),
  role: Joi.string().valid('ADMIN', 'MAHASISWA').optional(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters long',
  }),
  role: Joi.string().valid('ADMIN', 'MAHASISWA').optional(),
});
export { registerValidation, loginValidation };
