import {AppBar, Link, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    },
    link: {
        margin: theme.spacing(1, "auto"),
    },
    title: {
        color: theme.palette.common.white,
        paddingBottom: 3,
        fontSize: "3rem",
        [theme.breakpoints.down("sm")]: {
            fontSize: "2rem",
        },
    },
}));

export const TopBar = () => {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <Fragment>
            <AppBar
                className={classes.appBar}
                position="fixed"
            >
                <Toolbar>
                    <Link className={classes.link} href="/">
                        <Typography className={classes.title} variant="h1">
                            {t("appName")}
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </Fragment>
    );
};

export default TopBar;