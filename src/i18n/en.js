const en = {
    taylorsVersion: {
        appName: "(Taylor's Version)",
        authorize: {
            startButton: "Sign in",
            success: "account authorised successfully",
        },
        landing: {
            start: "Get Started"
        },
        process: {
            configure: {
                includePublic: "Your Public playlists",
                includeCollaborative: "Your Collaborative Playlists",
                includeOthers: "Other's Collaborative Playlists",
            },
            update: {
                openDialogButton: "Update Playlists",
                dialogTitle: "Update {{count}} playlist?",
                dialogTitle_plural: "Update {{count}} playlists?",
                dialogBody: "This will update {{count}} song to their (Taylor's Version).",
                dialogBody_plural: "This will update {{count}} songs to their (Taylor's Version).",
                dialogConfirm: "Yes",
                dialogCancel: "Cancel",
            },
        },
        notifications: {
            http: {
                noAuthToken: "Your auth token is missing, please sign in with Spotify again",
            },
            replacement: {
                success: "Playlist updating complete",
                failure: "Playlist updating completed with errors, please try again.",
            },
            levels: {
                info: "Info",
                warning: "Warning",
                error: "Error",
                success: "Success",
            },
        },
    }
};

export default en;