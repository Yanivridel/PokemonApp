import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => setPokemon(data));
    }, [id]);

    if (!pokemon) return <div>Loading...</div>;

    return (
        <div>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Base Experience: {pokemon.base_experience}</p>
        </div>
    );
};

export default PokemonDetails;
