import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); 
    const [loading, setLoading] = useState(true); // Loading state for fetching data

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
            const data = await response.json();
            setPokemon(data.results);
            setTotalPages(Math.ceil(data.count / 20)); // Calculate total pages
            setLoading(false);
        };

        fetchPokemon();
    }, [page]); // Fetch data when page changes

    const handlePageChange = (event, value) => {
        setPage(value); // Update page number when user changes page
    };

    return (
        <div>
            <h2>Pokemon List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ul>
                        {pokemon.map((poke, index) => (
                            <li key={index}>
                                <Link to={`/pokemon/${poke.name}`}>{poke.name}</Link>
                            </li>
                        ))}
                    </ul>

                    <Stack spacing={2} alignItems="center">
                        <Pagination
                            count={totalPages} // Total number of pages
                            page={page} // Current page
                            onChange={handlePageChange} // Handle page change
                            variant="outlined"
                            shape="rounded"
                        />
                    </Stack>
                </>
            )}
        </div>
    );
};

export default PokemonList;

