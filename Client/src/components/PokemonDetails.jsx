import React, { useEffect, useState } from "react";
import { Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody , Paper, LinearProgress, Chip, List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from 'axios'
import { Link } from "react-router-dom";
// Functions
import { getPokemonMoves, getTypeColor, cfl, calculateTextColor, createData, weightToKg, heightToMeters, getGenderRateMessage, calculateStatBars } from "../services/pokemon";
import { useTheme } from "@emotion/react";
import EvolutionChain from "./EvolutionChain";


function PokemonDetails({pokemon: poke, category}) {
    const [pokeSpecies, setPokeSpecies] = useState(null);
    const theme = useTheme();
    const breakpoint = 780;

    async function fetchSpecies() {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${poke.id}`);
        setPokeSpecies(data);
    }

    useEffect(() => {
        fetchSpecies();
    }, [])

    const aboutFirstTableRows = [
        createData("Species", poke?.species ? cfl(poke.species.name) : "Unknown"),
        createData('Height', poke?.height ? heightToMeters(poke.height) + " M" : "Unknown"),
        createData("Weight", poke?.weight ? weightToKg(poke.weight) + " KG" : "Unknown"),
        createData("Abilities", poke?.abilities ? poke.abilities.map(el => cfl(el.ability.name)).join(", ") : "Unknown"),
    ];
    const aboutSecondTableRows = [
        createData("Gender", pokeSpecies?.gender_rate ? getGenderRateMessage(pokeSpecies.gender_rate) : "Unknown"),
        createData("Egg Groups", pokeSpecies?.egg_groups ? pokeSpecies.egg_groups?.map((group) => cfl(group.name)).join(', ') : "Unknown"),
        createData("Egg Cycle", pokeSpecies?.hatch_counter ? pokeSpecies.hatch_counter : "Unknown"),
    ];
    const stats = calculateStatBars(poke.stats);
    const moves = getPokemonMoves(poke);

    return (
        <Box mt={2}>
            {category === "About" && <>
            <TableContainer component={Box}>
                <Table aria-label="about table">
                    <TableBody>
                    {aboutFirstTableRows.map((row, index) => (
                        <TableRow
                        key={row.leftSide + index}
                        sx={{ 'td': { border: 0 } }}
                        >
                            <TableCell align="left" sx={{ color: "gray"}}>{row.leftSide}</TableCell>
                            <TableCell align="left" sx={{ color: "black"}}>{row.rightSide}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" sx={{ marginTop: 1, fontSize: 17, color: "black"}}>Breeding</Typography>
            <TableContainer component={Box}>
                <Table aria-label="about breeding table">
                    <TableBody>
                    {aboutSecondTableRows.map((row, index) => (
                        <TableRow
                        key={row.leftSide + index}
                        sx={{ 'td': { border: 0 } }}
                        >
                            <TableCell align="left" sx={{ color: "gray"}}>{row.leftSide}</TableCell>
                            <TableCell align="left" sx={{ color: "black"}}>{row.rightSide}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </>}
            {category === "Base Stats" && <>
            <TableContainer component={Box}>
                <Table aria-label="about table">
                    <TableBody>
                    {stats.map((stat, index) => (
                        <TableRow
                        key={stat.statName+ index}
                        sx={{ 'td': { border: 0 } }}
                        >
                            <TableCell align="left" sx={{ color: "gray"}}>{stat.statName}</TableCell>
                            <TableCell align="left" sx={{ color: "black", display:"flex", alignItems: 'center', gap: 1}}>
                                <span>{stat.baseValue}</span>
                                <LinearProgress
                                variant="determinate"
                                value={+stat.percentage}
                                sx={{
                                height: 10,
                                width: 100,
                                borderRadius: 5,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 5,
                                    backgroundColor: index%2 === 0 ? '#76c7c0' : "#ed5a69",
                                }}}/>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Typography variant="h6" sx={{ marginTop: 1, fontSize: 17}}>Types</Typography>
            {poke.types.map((type, index) => (
                <Link key={index + `${type}`} to={`/pokemons?page=1&name=&type=${type.type.name}`}>
                    <Chip
                    key={index + `${type}`}
                    label={cfl(type.type.name)}
                    sx={{
                        m: 1,
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
                    />
                </Link>
            ))}
            </>}
            {category === "Evolution" && <>
            <Typography variant="h6" sx={{ marginBlock: 2, fontSize: 17}}>Evolution Chain</Typography>
            <EvolutionChain pokeSpecies={pokeSpecies}/>
            </>}
            {category === "Moves" && <>
            <Typography variant="h6" sx={{ mt: 2, fontSize: 17, color: "black"}}>Popular Moves</Typography>
            <List sx={{
                [`@media (max-width:${breakpoint}px)`]: {
                    maxHeight: 350,
                    overflow: "auto",
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
            {moves.map((move, index) => (
            <div key={index}>
                <ListItem alignItems="flex-start">
                <ListItemText
                    primary={
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "black"}}>
                        {move.name.split('-').map((word) => cfl(word)).join(" ")}
                    </Typography>
                    }
                    secondary={
                    <Box sx={{ color: "#494d4c"}}>
                        <Typography variant="span">
                        <strong>Learn Method:</strong> {move.learnMethod}
                        </Typography><br/>
                        <Typography variant="span">
                        <strong>Level Learned:</strong> {move.levelLearnedAt > 0 ? move.levelLearnedAt : 'N/A'}
                        </Typography><br/>
                        <Typography variant="span">
                        <strong>Version:</strong> {move.versionGroup.replaceAll("-", " ")}
                        </Typography>
                    </Box>
                    }
                />
                </ListItem>
                <Divider />
            </div>
            ))}
            </List>
            </>}
        </Box>
    )
}

export default PokemonDetails;