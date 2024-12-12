import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// img / gif
import rollGif from "./../assets/gif/poke-ball-rolling.gif"
// Function
import { calculateTextColor, cfl, getDailyNumbers, getTypeColor } from "../services/pokemon";
import { useTheme } from "@emotion/react";
import { fetchThreePokemons } from "../services/pokemon";


const Home = () => {
    const [ pokemons, setPokemons ] = useState([]);
    const [ paperHover, setPaperHover] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        fetchThreePokemons(setPokemons);
    }, []);

    const handleTypeClick = (e, type) => {
        e.stopPropagation();
        navigate(`/pokemons?type=${type}`)
    }

    return (
    <Box sx={{ padding: 3 , maxWidth: 1350, marginInline: "auto",
        color: theme.palette.text.primary,
    }}>
        {/* Welcome Section */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Welcome to the Pokémon World
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Discover and explore all your favorite Pokémon.
            </Typography>
        </Box>

        {/* Featured Pokémon */}
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
            Daily Pokémon
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2}}>
            {pokemons.map((pokemon, index) => 
            <Paper 
            key={pokemon.id}
            className={"pokemon-paper " + `${pokemon.types[0]?.type?.name}`}
            elevation={4}
            sx={{
                position: 'relative',
                flexGrow: 1,
                minWidth: 300,
                minHeight: 150,
                backgroundSize: "cover",
                backgroundPosition: 0,
                cursor: 'pointer',
            }}
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            onMouseEnter={() => setPaperHover(index)}
            onMouseLeave={() => setPaperHover(null)}
            >   
                <Box
                    sx={{
                    position: 'absolute',
                    width: 150,
                    height: 150,
                    backgroundImage: `url(${pokemon.sprites.other['official-artwork'].front_default})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    }}
                />
                { paperHover === index &&
                <Box
                sx={{
                position: 'absolute',
                transform: 'translate(-50%,-50%)',
                left: "50%",
                top: "50%",
                zIndex: 100,
                width: 75,
                height: 75,
                backgroundImage: `url(${rollGif})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                }}
                />
                }
                <Box sx={{ 
                    position: "relative",
                    zIndex: 500,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left", 
                    flexGrow: 1, 
                    m: 4, 
                    ml: "auto",
                    width: "fit-content"
                    }}>
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
            </Paper>
            )}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
            <Button variant="outlined" sx={{ marginRight: 2 }}>
            <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                Learn More About Us
            </Link>
            </Button>
            <Button variant="outlined">
            <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                Contact Us
            </Link>
            </Button>
        </Box>
    </Box>
    );
};


export default Home;

