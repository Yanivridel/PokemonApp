import express from "express";

import {
    getAllUsers,
    createUser,
    loginUser,
    getSelf,
    getUserById
} from '../controllers/userController.js'

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/signup", createUser);

router.post('/login', loginUser);

router.get('/get-self', getSelf);

router.get('/:id', getUserById);

export default router;