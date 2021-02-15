import Typography from "@material-ui/core/Typography";
import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export const TopBar = () => {
    const {t} = useTranslation();

    return (
        <Link to="/">
            <Typography variant="h1">
                {t("appName")}
            </Typography>
        </Link>
    );
};

export default TopBar;