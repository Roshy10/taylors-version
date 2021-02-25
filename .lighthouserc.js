module.exports = {
    ci: {
        collect: {
            staticDistDir: "./dist",
            autodiscoverUrlBlocklist: "/spotify/index.html",
        },
        upload: {
            target: "temporary-public-storage",
        },
    },
};