import Joi from 'joi';
const listingSchema = Joi.object({
  listing: Joi.object({
      title: Joi.string()
     .min(3)
     .max(100)
     .required(),
  description: Joi.string()
     .min(10)
     .max(500)
     .required(),
  image: Joi.string()
     .allow(null, ''),
  price: Joi.number()
     .min(0)
     .required(),
  country: Joi.string()
     .min(2)
     .max(100)
     .required(),
  location: Joi.string()
     .min(2)
     .max(100)
     .required()
}).required(),
});

export default listingSchema;