import express from "express";
import controller from "./controller";
import { validateUserScoreDataRequest, validateSingleUserScoreDataRequest } from "../common/middlewares/request-validator";


export default express.Router()
    .post("/getscore", validateUserScoreDataRequest, controller.getRandomScoreforUsers)
    .get("/getsingleuserscore", validateSingleUserScoreDataRequest, controller.getRandomScoreforSingleUsers)