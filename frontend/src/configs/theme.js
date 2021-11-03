import {createTheme} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#62d061",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#f5f5f5",
        },
    },
});

export default theme;
