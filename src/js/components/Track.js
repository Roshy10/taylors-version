import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import {track} from "../types";
import MediaArtwork from "./MediaArtwork";

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(6),
    },
    trackText: {
        flex: "1 1 50%",
    },
}));

const Track = ({data}) => {
    const classes = useStyles();
    const replacementTracks = useSelector(state => state.TrackReducer.tracks);
    const replacementTrack = replacementTracks && replacementTracks[data.replacement];

    return (
        <ListItem className={classes.nested} key={data.uri}>
            <MediaArtwork externalUrls={data.external_urls} images={data.album && data.album.images}/>
            <ListItemText className={classes.trackText} primary={data.name} secondary={data.album && data.album.name}/>

            {replacementTrack && (
                <Fragment>
                    <ListItemIcon>
                        <ArrowRightAltIcon/>
                    </ListItemIcon>
                    <MediaArtwork
                        externalUrls={replacementTrack.external_urls}
                        images={replacementTrack.album && replacementTrack.album.images}
                    />
                    <ListItemText
                        className={classes.trackText}
                        primary={replacementTrack.name}
                        secondary={replacementTrack.album && replacementTrack.album.name}
                    />
                </Fragment>
            )}
        </ListItem>
    );
};

Track.propTypes = {
    data: track,
};

export default Track;