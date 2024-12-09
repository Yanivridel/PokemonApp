import { Box, CircularProgress } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Functions
import { scrollToTop } from '../services/others';

const EvolutionChain = ({ pokeSpecies }) => {
    const [evolutionData, setEvolutionData] = useState([]);
    const [error, setError] = useState(null);

    const fetchEvolutionChain = async () => {
        try {
            const evolutionChainUrl = pokeSpecies.evolution_chain.url;
            const evolutionResponse = await fetch(evolutionChainUrl);
            const evolutionData = await evolutionResponse.json();

            const parseEvolution = async (chain) => {
            const pokemonName = chain.species.name;
            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const pokemonData = await pokemonResponse.json();
            const imageUrl = pokemonData.sprites.other['official-artwork'].front_default;

            const currentEntry = {
                name: pokemonName,
                image: imageUrl,
            };
            const evolutions = await Promise.all(
                chain.evolves_to.map(parseEvolution)
            );
            return [currentEntry, ...evolutions.flat()];
            };
            const result = await parseEvolution(evolutionData.chain);
            setEvolutionData(result);
        } catch (err) {
            setError('This Pokemon does not have evolution chain !');
            console.error(err);
        }
        };

    useEffect(() => {
        fetchEvolutionChain();
    }, [pokeSpecies]);

    if (error) {
        return <Box mt={2}>{error}</Box>;
    }

    if (!evolutionData.length) {
        return <Box display='flex' justifyContent='center' mt={3}><CircularProgress/></Box>;
    }


    return (
    <Box sx={{ display: 'flex', flexDirection: "column", gap: '20px', alignItems: 'center' }}>
        {evolutionData.map((pokemon, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
            <Link to={`/pokemon/${pokemon.name}`}>
                <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: '150px', height: '150px' }}
                onClick={scrollToTop}
                />
            </Link>
            <p className='font-courier' style={{ textTransform: 'capitalize' }}>{pokemon.name}</p>
            {index !== evolutionData.length -1 && <KeyboardDoubleArrowDownIcon color='primary' sx={{ fontSize: 50, mt: 3}}/>}
        </div>
        ))}
    </Box>
);
};

export default EvolutionChain;
