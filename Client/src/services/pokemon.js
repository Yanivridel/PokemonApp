import axios from "axios";

// Fetching Pokemon Api
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';

export const fetchAllPokemon = async (dispatch, setLoading, setPokemons) => {
    dispatch(setLoading(true));
    const response = await fetch(`${pokemonUrl}?limit=10000`);
    const data = await response.json();
    
    const detailedPokemon = await Promise.all(
    data.results.map(async (poke) => {
        const pokeDetails = await fetch(poke.url);
        return await pokeDetails.json();
    })
    );

    dispatch(setPokemons(detailedPokemon));
    dispatch(setLoading(false));
};

export const fetchThreePokemons = async (setPokemons) => {
    const responses = await Promise.all(getDailyNumbers().map((id) => fetch(`${pokemonUrl}/${id}`)));
    const dataArr = await Promise.all(responses.map(res => res.json()));
    setPokemons(dataArr);
}
// Fetching Server
const serverUrl = 'http://localhost:3000';

export const addFavPokemon = async (email, pokemonName) => {
    try {
        const response = await axios.post(`${serverUrl}/api/users/pokemons/add`, {
            email,
            pokemonName,
        });
    
        if (response.status === 200) {
            console.log('Successfully added Pokémon to favorites', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Error adding Pokémon to favorites:', error.message);
        return { status: 'error', message: error.message };
    }
}

export const deleteFavPokemon = async (email, pokemonName) => {
    try {
        const response = await axios.post(`${serverUrl}/api/users/pokemons/delete`, {
            email,
            pokemonName,
        });
    
        if (response.status === 200) {
            console.log('Successfully deleted Pokémon to favorites', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Error adding Pokémon to favorites:', error.message);
        return { status: 'error', message: error.message };
    }
}

// Others
export const allTypes = [
    "All",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Fighting",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
    "Flying",
    "Normal",
    "Ice",
];

export const getTypeColor = (type) => {
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

export const calculateTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const [red, green, blue] = [r, g, b].map(value =>
        value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
    );
    const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

    return luminance > 0.5 ? "black" : "white";
}

export const cfl = (name) => name.slice(0,1).toUpperCase() + name.slice(1);

export const createData = (leftSide, rightSide) => {return { leftSide, rightSide }}

export const weightToKg = (weight) => (weight * 0.1).toFixed(1);

export const heightToMeters = (height) => (height * 0.1).toFixed(2);

export function getGenderRateMessage(genderRate) {
    if (genderRate === -1) 
        return "This Pokémon is genderless.";
    if (genderRate < 0 || genderRate > 7) 
        return "Invalid gender rate.";
    const femalePercentage = (genderRate / 8) * 100;
    const malePercentage = 100 - femalePercentage;
    const femaleMessage = `${femalePercentage.toFixed(2)}% ♀`;
    const maleMessage = `${malePercentage.toFixed(2)}% ♂`;
    return `${femaleMessage}  /   ${maleMessage}`;
}

export function calculateStatBars(stats) {
    const maxStatValue = 190;
    const statBars = stats.map(stat => {
        const baseValue = stat.base_stat;
        const percentage = (baseValue / maxStatValue) * 100;
        return {
            statName: stat.stat.name.split("-").map(word => cfl(word)).join(" "),
            baseValue: baseValue,
            percentage: percentage.toFixed(2)
        };
    });
    return statBars;
}

export function getThreeRandomNumbers(min, max) {
    const numbers = new Set();
    while (numbers.size < 3) numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    return [...numbers];
}

export const getPokemonMoves = (pokemonData) => {
    return pokemonData.moves.map((entry) => ({
        name: entry.move.name,
        learnMethod: entry.version_group_details[0].move_learn_method.name,
        levelLearnedAt: entry.version_group_details[0].level_learned_at,
        versionGroup: entry.version_group_details[0].version_group.name,
    }));
};

export function getDailyNumbers() {
    const today = new Date().toISOString().split('T')[0];
    const seed = hashString(today);
    
    return [
        randomNumber(seed, 1),
        randomNumber(seed, 2),
        randomNumber(seed, 3),
    ];
}
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash * 31 + char) & 0xffffffff;
    }
    return Math.abs(hash);
}
function randomNumber(seed, offset) {
    const modSeed = (seed + offset * 999983) % 1000000;
    return (modSeed % 1000) + 1;
}