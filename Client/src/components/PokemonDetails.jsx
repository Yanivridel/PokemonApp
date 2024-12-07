import { Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody , Paper } from "@mui/material";
import React from "react";

function createData(leftSide, rightSide) {
    return { leftSide, rightSide };
}

const rows = [
    createData("Species", "Seed"),
    createData('Height', "2'3.7"),
    createData("Weight", "123 lbs"),
    createData("Abilities", "Overgrow, Chirlophy"),
];

function PokemonDetails({pokemon, category}) {

    return (
        <Box mt={2}>
            {category === "About" && 
            <>
            <TableContainer component={Box}>
                <Table aria-label="about table">
                    <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                        key={row.leftSide + index}
                        sx={{ 'td': { border: 0 } }}
                        >
                            <TableCell align="left" color="">{row.leftSide}</TableCell>
                            <TableCell align="left">{row.rightSide}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h7">Breeding</Typography>
            </>
            
            }
            {category === "Base Stats" && 
            <Typography variant="h7">Type Defenses</Typography>
            }
            {category === "Evolution" && 
            <Typography variant="h7">Awakening</Typography>
            }
            {category === "Moves" && 
            <Typography variant="h7">hi</Typography>
            }
        </Box>
    )
}

export default PokemonDetails;