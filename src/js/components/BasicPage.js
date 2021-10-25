import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import {useTranslation} from "react-i18next";
import Footer from "./Footer";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            marginTop: 0,
        },
    },
    title: {
        [theme.breakpoints.down("sm")]: {
            fontSize: "2rem",
        },
    },
    footerItem: {
        color: theme.palette.text.primary,
    },
}));

const BasicPage = (props) => {
    const {children, title} = props;
    const [translate] = useTranslation();
    const classes = useStyles(props);
    return (
        <React.Fragment>
            <TopBar/>
            <Container
                fixed
                className={classes.container}
            >
                {title ? (
                    <Typography className={classes.title} variant="h2">{translate(title)}</Typography>
                ) : null}
                {children}
            </Container>
            <Footer showSocials classes={{footerItem: classes.footerItem}}/>
        </React.Fragment>
    );
};

BasicPage.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default BasicPage;