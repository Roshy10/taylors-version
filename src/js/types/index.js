import PropTypes from "prop-types";

export const images = PropTypes.arrayOf(
    PropTypes.shape({
        height: PropTypes.number,
        url: PropTypes.string,
        width: PropTypes.number,
    }),
);

export const album = PropTypes.shape({
    images: images,
    name: PropTypes.string,
});

export const externalUrls = PropTypes.shape({
    spotify: PropTypes.string,
});

export const track = PropTypes.shape({
    album: album,
    external_urls: externalUrls,
    replacement: PropTypes.oneOfType([
        PropTypes.shape({
            album: album,
            external_urls: externalUrls,
        }),
        PropTypes.string,
    ]),
    uri: PropTypes.string,
});

export const playlist = PropTypes.shape({
    external_urls: externalUrls,
    id: PropTypes.string.isRequired,
    images: images,
    name: PropTypes.string,
    owner: PropTypes.shape({
        id: PropTypes.string,
    }),
    tracks: PropTypes.arrayOf(track),
});