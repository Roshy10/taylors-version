import {List, ListItem, ListItemText, Typography} from "@material-ui/core";
import React, {Fragment, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getPlaylists} from "../../../actions/PlaylistActions";
import useAuthToken from "../../../hooks/useAuthToken";

export const Configure = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const token = useAuthToken();
    const playlists = useSelector(state => state.PlaylistReducer.playlists);

    if (!token) {
        // token isn't valid, back to home screen
        return <Redirect to="/"/>;
    }

    useEffect(() => {
        // make request for playlists
        dispatch(getPlaylists);
    }, []);

    return (
        <Fragment>
            <Typography component="h2">
                {t("process.configure.listTitle")}
            </Typography>
            <List>
                {playlists.map((playlist) => (
                    <ListItem key={playlist.id}>
                        <ListItemText primary={playlist.name}/>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
};

export default Configure;