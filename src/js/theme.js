import {green, purple} from "@material-ui/core/colors";
import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
    props: {
        MuiLink: {
            underline: "none",
        },
    },
});

export default theme;