
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
            bgcolor: "purple",  // Default background (will be overridden)
            color: "#fff",  // Default text color (white)
            "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }
        }
    };

    if (!name) return style;

    // Get background color based on name
    const backgroundColor = stringToColor(name);
    style.sx["bgcolor"] = backgroundColor;
    
    // Check if the background is light or dark and set text color accordingly
    style.sx["color"] = isLight(backgroundColor) ? "#000" : "#fff";  // Black text for light background, white text for dark

    // Create the initials for the avatar
    style.children = `${name.split(" ").map((el) => el[0].toUpperCase()).join("")}`;
    
    return style;
}
function isLight(color) {
    // Convert hex to RGB
    const rgb = parseInt(color.slice(1), 16); // Remove the '#' and parse the color
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 127; // Returns true for light colors, false for dark
}
