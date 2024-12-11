import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons, setLoading } from "./../store/slices/pokemonsSlice.js";
import { Pagination, Stack, Grid2, Box, TextField, CircularProgress, Slider, Autocomplete, Typography, Button } from "@mui/material";
import PokemonPaper from "./PokemonPaper";
import { useSearchParams } from "react-router-dom";
import './css/PokemonList.css';
// Functions
import { scrollToTop } from '../services/others';
import { weightToKg, heightToMeters, allTypes, cfl } from "../services/pokemon.js";
import { fetchAllPokemon } from "../services/pokemon.js";

function PokemonList() {
    const [currentPokemonsPage, setCurrentPokemonsPage] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const favPokemons = useSelector(state => state.userLogged.favPokemons)

    const minDistanceWeight = 30;
    const minDistanceHeight = 0.1;

    const breakpoint = 470

    const dispatch = useDispatch();
    const { allPokemons, loading } = useSelector((state) => state.pokemonsData);

    const [searchParams, setSearchParams] = useSearchParams({
        page: 1,
        name: "",
        type: "",
        weight: [0,650],
        height: [0,20],
        fav: "false",
    });
    
    // Mount Call 
    useEffect(() => {
        if(getWeight(0) !== 0 && !getWeight(0) || !getWeight(1)) searchParams.set("weight", [0,650]);
        if(getHeight(0) !== 0 && !getHeight(0) || !getHeight(1)) searchParams.set("height", [0,20]);
        if (allPokemons.length === 0) {
            fetchAllPokemon(dispatch, setLoading, setPokemons);
        }
    }, [allPokemons, dispatch]);

    // Filtering Pokemons
    useEffect(() => {
        const filteredPokemon = allPokemons.filter((poke) =>{
            const pokeWeight = weightToKg(poke.weight);
            const pokeHeight = heightToMeters(poke.height);
            return poke.name.replaceAll("-"," ").toLowerCase().includes(searchParams.get("name").toLowerCase()) &&
            (!searchParams.get("type") ||
                poke.types.some((typeObj) =>
                typeObj.type.name.toLowerCase() === searchParams.get("type").toLowerCase()
                )
            ) &&
            (getWeight(0) <=  pokeWeight && pokeWeight <= getWeight(1)) &&
            (getHeight(0) <= pokeHeight && pokeHeight <= getHeight(1)) &&
            (searchParams.get("fav") === "false" || favPokemons.some(fav => fav.toLowerCase() === poke.name.toLowerCase()))
        });

        const page = +searchParams.get("page") || 1;
        const paginatedPokemon = filteredPokemon.slice((page - 1) * 20, page * 20);

        setCurrentPokemonsPage(paginatedPokemon);
        setTotalPages(Math.ceil(filteredPokemon.length / 20));
    }, [allPokemons, searchParams.toString()]);

    const handlePageChange = (e, val) => {
        searchParams.set("page", val);
        setSearchParams(searchParams);
    };
    const handleSearchChange = (e) => {
        searchParams.set("name", e.target.value.toLowerCase());
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    };

    const handleChangeWeight = (e, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;
    
        const newSearchParams = new URLSearchParams(searchParams);

        if (newValue[1] - newValue[0] < minDistanceWeight) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 650 - minDistanceWeight);
                newSearchParams.set("weight", [clamped, clamped + minDistanceWeight]);
            } else {
                const clamped = Math.max(newValue[1], minDistanceWeight);
                newSearchParams.set("weight", [clamped - minDistanceWeight, clamped]);
            }
        } else {
            newSearchParams.set("weight", newValue.join(","));
        }
        
        newSearchParams.set("page", 1);
        setSearchParams(newSearchParams);
    };
    const handleChangeHeight = (e, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;
    
        const newSearchParams = new URLSearchParams(searchParams); // Create a new instance
    
        if (newValue[1] - newValue[0] < minDistanceHeight) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 20 - minDistanceHeight);
                newSearchParams.set("height", [clamped, clamped + minDistanceHeight]);
            } else {
                const clamped = Math.max(newValue[1], minDistanceHeight);
                newSearchParams.set("height", [clamped - minDistanceHeight, clamped]);
            }
        } else {
            newSearchParams.set("height", newValue.join(","));
        }
        newSearchParams.set("page", 1);
        setSearchParams(newSearchParams);
    };
    const getWeight = (idx) => {
        const weight = searchParams.get("weight")?.split(",").map(Number);
        return weight ? weight[idx] : [0, 650][idx];
    };
    const getHeight = (idx) => {
        const height = searchParams.get("height")?.split(",").map(str => parseFloat(str));
        return height ? height[idx] : [0, 15][idx];
    };
    const handleSelectTypeChange = (e, newVal) => {
        if(!newVal || newVal === "All") 
            newVal = "";
        searchParams.set("type", newVal);
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    }
    const resetFilter = () => {
        searchParams.set("page", 1);
        searchParams.set("type", "");
        searchParams.set("name", "");
        searchParams.set("weight", [0,650]);
        searchParams.set("height", [0, 20]);
        searchParams.set("fav", "false");
        setSearchParams(searchParams);
    }
    const handleFavClick = () => {
        searchParams.set("page", 1);
        searchParams.set("fav", searchParams.get("fav") === "true" ? "false" : "true");
        setSearchParams(searchParams);
    };

    return (
        <div>
        <Typography variant="h4" sx={{textAlign: "center"}}>Pokemon Search</Typography>
        {/* Filters */}
        <Box maxWidth={1350} width={"80%"} margin={"auto"}>
            <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"} gap={1}>
                <TextField
                    label="Search Pokémon"
                    variant="outlined"
                    // fullWidth
                    sx={{flexGrow: 1}}
                    margin="normal"
                    value={searchParams.get("name")}
                    onChange={handleSearchChange}
                />
                <Button variant="outlined" 
                sx={{
                    p: 1.9, 
                    mt: 1,
                    [`@media (max-width:${breakpoint}px)`]: {
                        mt: -1,
                        mb: 1,
                        width: "100%",
                    },
                }}
                onClick={() => resetFilter()}
                >
                    Reset Search
                </Button>
            </Box>
            <Box display={"flex"} gap={3} alignItems={"center"} flexWrap={"wrap"}>
                <Autocomplete
                value={cfl(searchParams.get("type")) || "All"}
                disablePortal
                options={allTypes}
                sx={{ width: 300 , flexGrow: 1}}
                renderInput={(params) => <TextField {...params} label="Type" />}
                onChange={handleSelectTypeChange}
                />
                <Button variant={ searchParams.get("fav") === "false" ? "outlined" : "contained"} 
                sx={{
                    p: 1.9,
                    flexGrow: 1,
                    [`@media (max-width:${breakpoint}px)`]: {
                        mt: -1,
                        mb: 1,
                    },
                }}
                onClick={() => handleFavClick()}
                >
                    Favorites
                </Button>
                <Box flexGrow={1} minWidth={300}>
                    <Box display={"flex"} gap={3} alignItems={"center"}>
                        <Typography sx={{ whiteSpace: "nowrap"}}>Weight (KG):</Typography>
                        <Slider
                        max={650}
                        value={[getWeight(0),getWeight(1)]}
                        onChange={handleChangeWeight}
                        valueLabelDisplay="auto"
                        disableSwap
                        />
                    </Box>
                    <Box display={"flex"} gap={3}  alignItems={"center"}>
                    <Typography sx={{ whiteSpace: "nowrap"}}>Height (Meters):</Typography>
                        <Slider
                        max={20}
                        step={0.1}
                        value={[getHeight(0), getHeight(1)]}
                        onChange={handleChangeHeight}
                        valueLabelDisplay="auto"
                        disableSwap
                        />
                    </Box>
                </Box>
            </Box>
        </Box>

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
            <>
            <Box sx={{ maxWidth: 1350, margin: "auto" }}>
                <Grid2
                className="grid-container"
                container
                spacing={{ xs: 2, sm: 3, md: 4 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ justifyContent: "center", m: 1 }}
                >
                {currentPokemonsPage.map((poke, index) => (
                    <Grid2 key={poke.name + index} xs={2} sm={4} md={3}>
                    <PokemonPaper pokemon={poke} />
                    </Grid2>
                ))}
                </Grid2>
            </Box>

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
            </>
        )}
        </div>
    );
}

export default PokemonList;
