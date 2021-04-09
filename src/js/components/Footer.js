import {Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    footerItem: {
        color: theme.palette.common.white,
    },
}));

const Footer = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    return (
        <Fragment>
            <Link href="https://raw.githubusercontent.com/Roshy10/taylors-version/master/LICENSE">
                <Typography className={classes.footerItem}>{t("landing.legal")}</Typography>
            </Link>
            <Link href="https://github.com/Roshy10/taylors-version">
                <Typography className={classes.footerItem}>{t("landing.github")}</Typography>
            </Link>
            <Link href="https://ko-fi.com/roshy10">
                <Typography className={classes.footerItem}>{t("landing.donate")}</Typography>
            </Link>
        </Fragment>
    );
};

export default Footer;