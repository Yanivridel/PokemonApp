import express from "express";

import {
    getAllUsers,
    createUser,
    loginUser,
    getSelf,
    getUserById,
    addFavPokemon,
    deleteFavPokemon,
    changeUsername,
} from '../controllers/userController.js'

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/signup", createUser);

router.post('/login', loginUser);

router.get('/get-self', getSelf);

router.get('/:id', getUserById);

router.post('/pokemons/add', addFavPokemon);

router.post('/pokemons/delete', deleteFavPokemon);

router.post('/change/username', changeUsername)

export default router;