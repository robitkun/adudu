import Joi from 'joi';

const createEventValidation = Joi.object({
  title: Joi.string().max(255).required().messages({
    'string.base': 'Title harus berupa teks.',
    'string.empty': 'Title tidak boleh kosong.',
    'string.max': 'Title tidak boleh lebih dari 255 karakter.',
    'any.required': 'Title wajib diisi.',
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description harus berupa teks.',
  }),
  event_date: Joi.date().required().messages({
    'date.base': 'Event date harus berupa tanggal yang valid.',
    'any.required': 'Event date wajib diisi.',
  }),
  location: Joi.string().optional().max(255).messages({
    'string.base': 'Location harus berupa teks.',
    'string.max': 'Location tidak boleh lebih dari 255 karakter.',
  }),
  image_url: Joi.string().optional().messages({
    'string.base': 'Image URL harus berupa teks.',
  }),
});

const updateEventValidation = Joi.object({
  title: Joi.string().max(255).optional().messages({
    'string.base': 'Title harus berupa teks.',
    'string.max': 'Title tidak boleh lebih dari 255 karakter.',
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description harus berupa teks.',
  }),
  event_date: Joi.date().optional().messages({
    'date.base': 'Event date harus berupa tanggal yang valid.',
  }),
  location: Joi.string().optional().max(255).messages({
    'string.base': 'Location harus berupa teks.',
    'string.max': 'Location tidak boleh lebih dari 255 karakter.',
  }),
  image_url: Joi.string().optional().messages({
    'string.base': 'Image URL harus berupa teks.',
  }),
});

export { createEventValidation, updateEventValidation };
