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
        marginBottom: 76 + theme.spacing(1), // height of the footer + a bit
        [theme.breakpoints.down("xs")]: {
            marginBottom: 68 + theme.spacing(1),
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
    footerBackground: {
        background: theme.palette.common.white,
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
            <Footer showSocials classes={{footerItem: classes.footerItem, root: classes.footerBackground}}/>
        </React.Fragment>
    );
};

BasicPage.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default BasicPage;