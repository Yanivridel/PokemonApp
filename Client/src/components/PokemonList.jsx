import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons, setLoading } from "./../store/slices/pokemonsSlice.js";
import { Pagination, Stack, Grid2, Box, TextField, CircularProgress } from "@mui/material";
import PokemonPaper from "./PokemonPaper";
import { useSearchParams } from "react-router-dom";
import './PokemonList.css';

function PokemonList() {
    const [currentPokemonsPage, setCurrentPokemonsPage] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const dispatch = useDispatch();
    const { allPokemons, loading } = useSelector((state) => state.pokemonsData);

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        name: "",
        type: "",
    });

    const fetchAllPokemon = async () => {
        dispatch(setLoading(true));
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
        const data = await response.json();
        
        const detailedPokemon = await Promise.all(
        data.results.map(async (poke) => {
            const pokeDetails = await fetch(poke.url);
            return await pokeDetails.json();
        })
        );

    dispatch(setPokemons(detailedPokemon)); // Dispatch to Redux state
    dispatch(setLoading(false));
    };

    useEffect(() => {
        if (allPokemons.length === 0) {
        fetchAllPokemon(); // Fetch only if data isn't already in the store
        }
    }, [allPokemons, dispatch]);

    useEffect(() => {
        const filteredPokemon = allPokemons.filter((poke) =>
        poke.name.toLowerCase().includes(searchParams.get("name").toLowerCase()) &&
        (!searchParams.get("type") ||
            poke.types.some((typeObj) =>
            typeObj.type.name.toLowerCase() === searchParams.get("type").toLowerCase()
            )
        )
        );

        const page = +searchParams.get("page") || 1;
        const paginatedPokemon = filteredPokemon.slice((page - 1) * 20, page * 20);

        setCurrentPokemonsPage(paginatedPokemon);
        setTotalPages(Math.ceil(filteredPokemon.length / 20));
    }, [allPokemons, searchParams.get("name"), searchParams]);

    const handlePageChange = (e, val) => {
        searchParams.set("page", val);
        setSearchParams(searchParams);
    };

    const handleSearchChange = (e) => {
        searchParams.set("name", e.target.value.toLowerCase());
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    };

    const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    return (
        <div>
        <h2>Pokemon List</h2>

        <TextField
            label="Search Pokémon"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchParams.get("name")}
            onChange={handleSearchChange}
        />

        <Stack spacing={2} alignItems="center" sx={{ marginBlock: 2 }}>
                <Pagination
                count={totalPages}
                page={+searchParams.get("page") || 1}
                color="primary"
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                onClick={scrollToTop}
                />
        </Stack>

        {loading ? (
            <div style={{display: "flex", justifyContent: "center"}}>
                <CircularProgress size={60}/>
            </div>
        ) : (
            <Box sx={{ maxWidth: 1350, margin: "auto" }}>
                <Grid2
                className="grid-container"
                container
                spacing={{ xs: 2, sm: 3, md: 4 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ justifyContent: "center" }}
                >
                {currentPokemonsPage.map((poke, index) => (
                    <Grid2 key={poke.name + index} xs={2} sm={4} md={3}>
                    <PokemonPaper pokemon={poke} />
                    </Grid2>
                ))}
                </Grid2>
            </Box>
        )}
        <Stack spacing={2} alignItems="center" sx={{ marginBlock: 2 }}>
                <Pagination
                count={totalPages}
                page={+searchParams.get("page") || 1}
                color="primary"
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                onClick={scrollToTop}
                />
        </Stack>
        </div>
    );
}

export default PokemonList;
