import {createMuiTheme} from "@material-ui/core/styles";

const primaryColour = "#FE6B8B";
const secondaryColour = "#FF8E53";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColour,
            contrastText: "#FFF",
        },
        secondary: {
            main: secondaryColour,
        },
    },
    props: {
        MuiLink: {
            underline: "none",
        },
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                html: {
                    height: "100%",
                },
                body: {
                    background: `linear-gradient(45deg, ${primaryColour} 30%, ${secondaryColour} 90%)`,
                    height: "100%",
                },
                "#container": {
                    height: "100%",
                },
            },
        },
    },
});

export default theme;