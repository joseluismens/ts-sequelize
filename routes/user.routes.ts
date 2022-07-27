import { Router } from "express";
import UserController from "../controllers/user.controller"
const router = Router();

router
    .get('/users', UserController.listAll)
    .post('/users', UserController.newUser);

router.get("/users/:id", UserController.getUser)
    .put("/users/:id", UserController.updateUser)
    .delete("/users/:id", UserController.deleteUser)
export default router;