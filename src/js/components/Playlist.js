import {Checkbox, Collapse, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {isArray} from "lodash";
import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {playlist} from "../types";
import MediaArtwork from "./MediaArtwork";
import Track from "./Track";

const useStyles = makeStyles((theme) => ({
    expanded: {
        backgroundColor: theme.palette.grey["200"],
    },
}));

const Playlist = ({excluded, data, toggleExcluded}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    return (
        <Fragment key={data.id}>
            <ListItem button className={expanded ? classes.expanded : null} onClick={() => setExpanded((val) => !val)}>
                <MediaArtwork externalUrls={data.external_urls} images={data.images}/>
                <ListItemText primary={data.name} secondary={data.owner.id}/>
                {expanded ? <ExpandLess/> : <ExpandMore/>}
                <ListItemSecondaryAction>
                    <Checkbox
                        checked={!excluded}
                        edge="end"
                        onChange={toggleExcluded}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse unmountOnExit in={expanded} timeout="auto">
                <List disablePadding component="div">
                    {isArray(data.tracks) && data.tracks.map((track) =>
                        <Track data={track} key={track.uri}/>,
                    )}
                </List>
            </Collapse>
        </Fragment>
    );
};

Playlist.propTypes = {
    data: playlist,
    excluded: PropTypes.bool,
    toggleExcluded: PropTypes.func,
};

export default Playlist;