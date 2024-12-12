import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Typography, Grid2, Box, CircularProgress, Button, Paper, IconButton } from '@mui/material';
import AnimationIcon from '@mui/icons-material/Animation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@emotion/react';
import PokemonDetails from './PokemonDetails';
import { useDispatch, useSelector } from 'react-redux';
// Functions
import { addFavPokemon, deleteFavPokemon } from '../services/pokemon';
import { addPokemon, deletePokemon } from '../store/slices/userSlice';

const cfl = (str) => { return str.charAt(0).toUpperCase() + str.slice(1)};

const PokemonCard = () => {    
    const { name } = useParams();
    const userLogged = useSelector(state => state.userLogged);
    const [pokemon, setPokemon] = useState(null);
    const theme = useTheme();
    const secondColor = theme.palette.secondary.main;
    const [showAnimation, setShowAnimation] = useState(false);
    const [selectedButton, setSelectedButton] = useState("About");
    const [ liked, setLiked ] = useState(false);
    const breakpoint = 780;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data || Object.keys(data).length === 0) {
                navigate('/404');
            }
            setPokemon(data);
        })
        .catch(() => {
            navigate('/404');
        });
    
        setLiked(userLogged.favPokemons.some((poke) => poke.toLowerCase() === name.toLowerCase()))
        
    }, [name, userLogged.favPokemons, navigate]);

    const handleLikePokemon = (pokemonName) => {
        if(!userLogged.isLogged) {
            alert("To like pokemons you must login first");
            return;
        }
        if(!liked) {
            addFavPokemon(userLogged.email, pokemonName);
            dispatch(addPokemon({pokemonName}));
        }
        else {
            deleteFavPokemon(userLogged.email, pokemonName);
            dispatch(deletePokemon({pokemonName}));
        }
        setLiked(!liked);
    }

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
                <Typography
                sx={{
                    p: 4,
                    fontFamily: "Baloo2",
                    fontSize: 40,
                    fontWeight: 700,
                    position: 'relative',
                    zIndex: 1000
                }}
                >
                    {pokemon.name.split("-").map(word => cfl(word)).join(" ")}
                </Typography>
                <IconButton
                color='primary'
                sx={{
                    position: "absolute",
                    bottom: "5%",
                    right: "10%",
                    zIndex: 1000
                }}
                onClick={() => setShowAnimation(!showAnimation)}>
                    <AnimationIcon sx={{ fontSize: 40}}/>
                </IconButton>
                <IconButton
                color='primary'
                sx={{
                    position: "absolute",
                    bottom: "5%",
                    left: "10%",
                    zIndex: 1000
                }}
                onClick={() => handleLikePokemon(pokemon.name)}>
                    { liked ? <FavoriteIcon sx={{ fontSize: 40}}/> : <FavoriteBorderIcon sx={{ fontSize: 40}}/>}
                </IconButton>
                <Box 
                component='img'
                src={!showAnimation ? pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
                : `https://play.pokemonshowdown.com/sprites/ani/${pokemon.name.toLowerCase()}.gif`}
                alt={pokemon.name}
                width={170}
                sx={{
                    position: 'absolute',
                    zIndex: 200,
                    transform: 'translate(-50%)',
                    bottom: 10,
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
                mb: 5,
                padding: '1rem 1.9rem',
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
                    maxHeight: 350,
                    overflowY: "auto",
                },
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    borderRadius: '10px',
                    border: `2px solid ${theme.palette.background.paper}`,
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: theme.palette.background.default,
                    borderRadius: '10px',
                },
                }}>
                    <Box 
                    sx={{
                        display: 'flex', 
                        gap: 1,
                        overflow: "visible", 
                        position: 'sticky', 
                        top: 0, 
                        zIndex: 300,
                        backdropFilter: 'blur(5px)',
                    }}
                    >
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