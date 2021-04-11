import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    shareBar: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2),
    },
    shareItem: {
        margin: theme.spacing(0, 2),
    },
}));

const SocialBar = () => {
    const classes = useStyles();
    const {t} = useTranslation();

    const shareMessage = t("shareMessage");

    return (
        <span className={classes.shareBar}>
            <a className={clsx(classes.shareItem, "tumblr-share-button")} data-color="blue" data-notes="none" href="https://embed.tumblr.com/share"/>
            <div className={clsx(classes.shareItem, "fb-share-button")} data-href="https://taylors-version.com" data-layout="button" data-size="small">
                <a
                    className="fb-xfbml-parse-ignore"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftaylors-version.com%2F&amp;src=sdkpreparse"
                    rel="noreferrer"
                    target="_blank"
                >Share</a></div>
            <a
                className={clsx(classes.shareItem, "twitter-share-button")}
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&hashtags=Taylorized`}
            >Tweet</a>
        </span>
    );
};

export default SocialBar;