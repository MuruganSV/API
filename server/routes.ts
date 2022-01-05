import { Router } from "express";
import router from './api/controller/router';

export const routes = (): Router => {
    return Router()
        .use('/tenpin', router)
        .use('/tenpinadvance', router);
}