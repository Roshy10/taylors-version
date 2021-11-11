import {Box, Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import {useTranslation} from "react-i18next";
import SocialBar from "./SocialBar";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: 0,
        paddingBottom: theme.spacing(2),
        color: theme.palette.common.white,
        left: 0,
        right: 0,
        [theme.breakpoints.down("xs")]: {
            paddingBottom: theme.spacing(1),
        },
    },
    itemContainer: {
        display: "flex",
        justifyContent: "space-evenly",

    },
    footerItem: {
        color: theme.palette.common.white,
    },
}));

const Footer = (props) => {
    const {t} = useTranslation();
    const classes = useStyles(props);
    const {showSocials} = props;
    return (
        <footer className={classes.root}>
            {showSocials ? (
                <SocialBar/>
            ) : null}
            <Box className={classes.itemContainer}>
                <Link href="https://raw.githubusercontent.com/Roshy10/taylors-version/master/LICENSE">
                    <Typography className={classes.footerItem}>{t("landing.legal")}</Typography>
                </Link>
                <Link href="https://github.com/Roshy10/taylors-version">
                    <Typography className={classes.footerItem}>{t("landing.github")}</Typography>
                </Link>
                <Link href="/faq">
                    <Typography className={classes.footerItem}>{t("landing.faq")}</Typography>
                </Link>
                <Link href="https://ko-fi.com/roshy10">
                    <Typography className={classes.footerItem}>{t("landing.donate")}</Typography>
                </Link>
            </Box>
        </footer>
    );
};

Footer.propTypes = {
    showSocials: PropTypes.bool,
};

export default Footer;