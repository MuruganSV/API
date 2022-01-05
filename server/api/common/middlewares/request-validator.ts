import { Request, Response, NextFunction } from "express";
import { singleUserScoreSchema, userSchema } from "../schema";

export const validateUserScoreDataRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSchema.validate(req.body);
    if(error) {
        res.status(400).send({ error: "Invalid user Data" });
    }
    else {
        next();
    }
}

export const validateSingleUserScoreDataRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = singleUserScoreSchema.validate(req.query);
    if(error) {
        res.status(400).send({ error: "Invalid Range Data" });
    }
    else {
        next();
    }
}