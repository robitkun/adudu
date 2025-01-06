import Joi from 'joi';

const createForumValidation = Joi.object({
  title: Joi.string().min(1).required().messages({
    'string.empty': 'Title tidak boleh kosong',
    'string.min': 'Title minimal 1 karakter',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Content tidak boleh kosong',
  }),
});

const editForumValidation = Joi.object({
  title: Joi.string().min(1).required().messages({
    'string.empty': 'Title tidak boleh kosong',
    'string.min': 'Title minimal 1 karakter',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Content tidak boleh kosong',
  }),
});
export { createForumValidation, editForumValidation };
