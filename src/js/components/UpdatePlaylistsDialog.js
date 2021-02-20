import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {flatten} from "lodash";
import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {replaceAll} from "../actions/ReplacementActions";
import {playlist} from "../types";

const UpdatePlaylistsDialog = ({ButtonProps, replacements}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);

    const replacementTrackCount = replacements &&
        flatten(replacements.map((playlist) => playlist.tracks)).length;

    const handleClose = () => setDialogOpen(false);

    const handleConfirm = () => {
        handleClose();
        dispatch(replaceAll(replacements));
    };

    return (
        <Fragment>
            <Button
                color="primary"
                disabled={replacements.length < 1}
                onClick={() => setDialogOpen(true)}
                variant="contained"
                {...ButtonProps}
            >
                {t("process.update.openDialogButton")}
            </Button>
            <Dialog
                onClose={handleClose}
                open={dialogOpen}
            >
                <DialogTitle>{t("process.update.dialogTitle", {count: replacements.length})}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t("process.update.dialogBody", {count: replacementTrackCount})}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        {t("process.update.dialogCancel")}
                    </Button>
                    <Button autoFocus color="primary" onClick={handleConfirm}>
                        {t("process.update.dialogConfirm")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

UpdatePlaylistsDialog.propTypes = {
    ButtonProps: PropTypes.object,
    replacements: PropTypes.arrayOf(playlist),
};

export default UpdatePlaylistsDialog;