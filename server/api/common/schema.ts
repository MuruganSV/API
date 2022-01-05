import Joi from "joi";

export const userSchema = Joi.object({
    names: Joi.array().items(Joi.string().required()).required(),
});

export const singleUserScoreSchema = Joi.object({
    max: Joi.number().min(1).max(11).required(),
});