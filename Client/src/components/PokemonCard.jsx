import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid2, Box, CircularProgress, Button, Paper } from '@mui/material';
import { useTheme } from '@emotion/react';
import PokemonDetails from './PokemonDetails';

const PokemonCard = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const theme = useTheme();
    const secondColor = theme.palette.secondary.main;
    const [showAnimation, setShowAnimation] = useState(false);
    const [selectedButton, setSelectedButton] = useState("About");
    const breakpoint = 780;

    useEffect(() => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data);
            });
        }, []);

    if (!pokemon) 
    return <div style={{display: "flex", justifyContent: "center", alignItems: 'end', height:300}}>
                <CircularProgress size={60}/>
            </div>;

    return (
    <Grid2 container sx={{justifyContent: 'center', mt: 1}}>
        <Grid2 xs={12} md={6}>
            <Box 
            className={`${pokemon.types[0].type.name}`}
            sx={{
                position: 'relative',
                backgroundPosition: "right -360px bottom -60px",
                minHeight: 320, width: 390,
                maxWidth: '100%',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                [`@media (min-width:${breakpoint}px)`]: {
                    borderBottomLeftRadius: 30,
                    borderTopRightRadius: 0,
                    mt: 5,
                    minHeight: 350,
                },
            }}>
                <Typography>
                    {pokemon.name}
                </Typography>
                <Button variant="contained" onClick={() => setShowAnimation(!showAnimation)}>
                {showAnimation ? 'Stop Animation' : 'Show Animation'}
                </Button>
                <Box 
                component='img'
                src={!showAnimation ? pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
                : `https://play.pokemonshowdown.com/sprites/ani/${pokemon.name.toLowerCase()}.gif`}
                alt={pokemon.name} 
                width={170}
                sx={{
                    position: 'absolute',
                    zIndex: 200,
                    transform: 'translate(-50%,-50%)',
                    top: 230,
                    left: '50%'
                }}
                >
                </Box>
            </Box>
        </Grid2>
        <Grid2 xs={12} md={6}>
            <Paper 
            elevation={4} 
            sx={{ 
                position: 'relative',
                backgroundColor: 'white',
                minHeight: 300,
                width: 390,
                maxWidth: '100%',
                mt: -3,
                padding: '3rem 2rem',
                zIndex: 100,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                [`@media (min-width:${breakpoint}px)`]: {
                    borderTopLeftRadius: 30,
                    borderBottomLeftRadius: 30,
                    borderTopRightRadius: 0,
                    pt: 2,
                    mt: 5,
                    ml: -3,
                    minHeight: 350,
                },
                }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {['About', 'Base Stats', 'Evolution', 'Moves'].map((label) => (
                            <Button
                            key={label}
                            variant="text"
                            size="small"
                            sx={{
                                textTransform: 'unset',
                                borderBottom: selectedButton === label ? `3px solid ${secondColor}` : 'none',
                            }}
                            onClick={() => setSelectedButton(label)}
                            >
                            {label}
                            </Button>
                        ))}
                    </Box>
                    <PokemonDetails pokemon={pokemon} category={selectedButton}/>
            </Paper>
        </Grid2>
    </Grid2>
    );
};

export default PokemonCard;


/*
<Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
            <Box
                
                // component="img"
                // alt={`${pokemon.types[0].type.name} type`}
                // height="140"
                sx={{ height: 'auto', width: 300}}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> 
            </Card>
            </Box>
*/