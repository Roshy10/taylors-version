import {Avatar, ListItemAvatar} from "@material-ui/core";
import {isArray, isNull, sortBy} from "lodash";
import PropTypes from "prop-types";
import React from "react";

export const MediaArtwork = ({externalUrls, images}) => {
    const artworks = isArray(images) && images.length > 0 && sortBy(images, "width");
    const artworkThumb = artworks && artworks.find((img) => img.width > 40 || isNull(img.width));

    return (
        <ListItemAvatar>
            <a href={externalUrls && externalUrls.spotify} rel="noopener noreferrer" target="_blank">
                {artworkThumb && (<Avatar src={artworkThumb.url} variant="square"/>) || null}
            </a>
        </ListItemAvatar>
    );
};

export default MediaArtwork;

MediaArtwork.propTypes = {
    externalUrls: PropTypes.shape({
        spotify: PropTypes.string,
    }),
    images: PropTypes.arrayOf(
        PropTypes.shape({
            height: PropTypes.number,
            url: PropTypes.string,
            width: PropTypes.number,
        }),
    ),
};