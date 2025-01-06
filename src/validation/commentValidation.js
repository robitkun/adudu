import Joi from 'joi';

const createCommentValidation = Joi.object({
  content: Joi.string().required().messages({
    'string.empty': 'Comment tidak boleh kososng',
  }),
  forum_id: Joi.string().uuid().required().messages({
    'any.required': 'Forum ID is required.',
    'string.uuid': 'Forum ID must be a valid UUID.',
  }),
  parent_id: Joi.string().uuid().optional().allow(null).messages({
    'string.uuid': 'Parent ID must be a valid UUID.',
  }),
});

export { createCommentValidation };
