import { Router, Request, Response } from "express";
import auth from "../routes/auth.routes";
import user from "../routes/user.routes";
const routes = Router();

routes.use("/api",user);
routes.use("/api",auth);

export default routes;