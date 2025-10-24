import Joi from "joi";

export const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
      filename: Joi.string().allow(""),
      url: Joi.string().allow("", null),
    }),
    reviews: Joi.array().optional(),
    _id: Joi.string().optional(),
    __v: Joi.number().optional(),
    geometry: Joi.object({
      type: Joi.string().valid("Point").optional(),
      coordinates: Joi.array().items(Joi.number()).min(2).max(2).optional(),
    }).optional(),
  }).optional(),
});
