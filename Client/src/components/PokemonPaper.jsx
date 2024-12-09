// PokemonPaper.js
import React, { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, Chip, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material";
// Functions
import { getTypeColor, cfl, calculateTextColor } from "../services/pokemon";

const PokemonPaper = ({ pokemon }) => {
    // const [pokemon, setPokemon] = useState(poke);
    // const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const [ searchParams, setSearchParams] = useSearchParams();

    // async function fetchPokemon() {
    //     try {
    //         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    //         const data = await response.json();
    //         setPokemon(data);
    //     } catch (error) {
    //         console.error("Error fetching Pokemon data:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    // fetchPokemon();
    // }, [name]);

    // if (loading) {
    //     return (
    //         <Paper
    //         elevation={4}
    //         sx={{
    //             padding: 2,
    //             width: 250,
    //             height: 130,
    //             borderRadius: 3, 
    //         }}
    //         >
    //             <CircularProgress />
    //         </Paper>
    //     );
    // }

    if (!pokemon) {
        return (
            <Paper
            elevation={4}
            sx={{
                padding: 2,
                width: 250,
                height: 130,
                borderRadius: 3, 
            }}
            >
                <Typography variant="h6">Pokemon not found</Typography>
            </Paper>
        );
    }
    
    const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    const handleTypeClick = (e, typeName) => {
        e.stopPropagation();
        e.preventDefault();
    
        scrollToTop();
        searchParams.set("type", typeName);
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    };

    return (
    <Link to={`/pokemon/${pokemon.name}`}>
        <Paper
        className={"pokemon-paper " + `${pokemon.types[0]?.type?.name}`}
        elevation={4}
        sx={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: 270,
            borderRadius: 3,
            transition: "transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease",
            opacity: "var(--opacity, 1)",
            filter: "var(--filter, grayscale(0%))",
            "&:hover": {
                transform: "scale(1.05) rotate(2deg)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                opacity: 1,
                filter: "grayscale(0%)",
            },
        }}
        onMouseEnter={(e) => {
            const parent = e.currentTarget.closest(".grid-container");
            parent.style.setProperty("--opacity", 0.7);
            parent.style.setProperty("--filter","grayscale(60%)");
        }}
        onMouseLeave={(e) => {
            const parent = e.currentTarget.closest(".grid-container");
            parent.style.setProperty("--opacity", 1);
            parent.style.setProperty("--filter", "grayscale(0%)");
        }}
        >
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left", flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Sebino', fontWeight: 900, mb: 1}}>
                {pokemon.name.split("-").map(word => cfl(word)).join(" ")}
            </Typography>
        
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {pokemon.types.map((type, index) => (
                <Chip
                key={index + `${type}`}
                label={cfl(type.type.name)}
                sx={{
                    color: `${calculateTextColor(getTypeColor(type.type.name))}`,
                    fontSize: "0.75rem",
                    background: `${getTypeColor(type.type.name)}`,
                    border: `0.5px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                        background: `${getTypeColor(type.type.name)}`,
                    }
                }}
                onClick={(e) => handleTypeClick(e, type.type.name)}
                />
            ))}
            </Box>
        </Box>
        <Box
            sx={{
            width: 100,
            height: 100,
            backgroundImage: `url(${pokemon.sprites.front_default})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            }}
        />
        </Paper>
    </Link>
    );
};

export default PokemonPaper;
