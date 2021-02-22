const NBSP = "\u00A0";

const en = {
    taylorsVersion: {
        appName: "Taylor's Version",
        authorize: {
            startButton: "Sign in",
            success: "account authorised successfully",
        },
        landing: {
            message: `Update your Spotify playlists to use the latest (Taylor's${NBSP}Version)`,
            messageTwo: "Support Taylor Swift in her fight to own her own music.",
            github: "Github",
            donate: "Donate",
            legal: "Legal",
        },
        process: {
            configure: {
                includePublic: "Your Public playlists",
                includeCollaborative: "Your Collaborative Playlists",
                includeOthers: "Other's Collaborative Playlists",
                noneFound: "Looks like your playlists are already Taylorized!",
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