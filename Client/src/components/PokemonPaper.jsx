// PokemonPaper.js
import React, { useEffect, useState } from "react";
import { Paper, Typography, CircularProgress, Chip, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material";

const PokemonPaper = ({ pokemon }) => {
    // const [pokemon, setPokemon] = useState(poke);
    // const [loading, setLoading] = useState(false);
    const theme = useTheme();

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

    const getTypeColor = (type) => {
        const typeColors = {
            fire: "#fbbd28",
            water: "#0095d9",
            grass: "#7ac74c",
            electric: "#f7d02c",
            psychic: "#f366b9",
            fighting: "#c22e28",
            poison: "#a33ea1",
            ground: "#6d4f2f",
            rock: "#b6a136",
            bug: "#a6b91a",
            ghost: "#735797",
            dragon: "#6f35fc",
            dark: "#705746",
            steel: "#b7b7b7",
            fairy: "#d685ad",
            flying: "#a98ff3",
            normal: "#a8a77a",
            ice: "#96d9d6",
        };
        
        return typeColors[type] || "#ccc";
    };
    
    function calculateTextColor(hex) {
        // Convert hex to RGB
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
    
        // Calculate relative luminance
        const [red, green, blue] = [r, g, b].map(value =>
            value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
        );
        const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    
        // Return white for dark colors and black for light colors
        return luminance > 0.5 ? "black" : "white";
    }
    
    const capitalizeFirstLetter = (name) => name.slice(0,1).toUpperCase() + name.slice(1);
    
    const scrollToTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

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
            "&:hover": {
                transform: "scale(1.05) rotate(2deg)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                opacity: 1
            },
        }}
        onMouseEnter={(e) => {
            const parent = e.currentTarget.closest(".grid-container");
            parent.style.setProperty("--opacity", 0.7);
        }}
        onMouseLeave={(e) => {
            const parent = e.currentTarget.closest(".grid-container");
            parent.style.setProperty("--opacity", 1);
        }}
        >
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left", flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Sebino', fontWeight: 900, mb: 1}}>
                {capitalizeFirstLetter(pokemon.name)}
            </Typography>
        
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {pokemon.types.map((type, index) => (
                <Link key={index + `${type}`} to={`/pokemons?page=1&name=&type=${type.type.name}`}>
                    <Chip
                    key={index + `${type}`}
                    label={capitalizeFirstLetter(type.type.name)}
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
                    onClick={scrollToTop}
                    />
                </Link>
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
