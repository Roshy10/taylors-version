import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles({
    textContainer: {
        alignItems: "center",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
    },
});

/* copied from https://v4.mui.com/components/progress/#progress */
const CircularProgressWithLabel = ({value}) => {
    const classes = useStyles();
    return (
        <Box display="inline-flex" position="relative">
            <CircularProgress value={value} variant="determinate"/>
            <Box className={classes.textContainer}>
                <Typography color="textSecondary" component="div" variant="caption">
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default CircularProgressWithLabel;