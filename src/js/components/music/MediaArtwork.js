import {Avatar, ListItemAvatar} from "@material-ui/core";
import {isArray, isNull, sortBy} from "lodash";
import React from "react";
import {externalUrls, images} from "../../types";

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

MediaArtwork.propTypes = {
    externalUrls: externalUrls,
    images: images,
};

export default MediaArtwork;