import express from "express";

import {
    getAllUsers,
    createUser,
    loginUser,
    getSelf,
    getUserById,
    addFavPokemon,
    deleteFavPokemon,
} from '../controllers/userController.js'

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/signup", createUser);

router.post('/login', loginUser);

router.get('/get-self', getSelf);

router.get('/:id', getUserById);

router.post('/pokemons/add', addFavPokemon);

router.post('/pokemons/delete', deleteFavPokemon);

export default router;