import { styled } from "@mui/material";

export function stringToColor(string) {
    let i, hash = 0, color = '#';
    for (i = 0; i < string.length; i += 1)
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}
export function stringAvatar(name) {
    const style = {
        sx: {
        width: 50,
        height: 50,
        m: 2,
        bgcolor: "purple",
        "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }
        }
    }
    if(!name)
        return style;
    style.sx["bgcolor"] = stringToColor(name)
    style.children = `${name.split(" ").map((el) => el[0].toUpperCase()).join("")}`
    return style;
}