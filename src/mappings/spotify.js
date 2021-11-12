import fearless from "./fearless";
import red from "./red";

const spotify = [
    // Single - Wildest Dreams
    {
        "replacement": "spotify:track:1Ov37jtRQ2YNAe8HzfczkL",
        "originals": [
            // 1989
            "spotify:track:3fVnlF4pGqWI9flVENcT28",
            // 1989 (Deluxe)
            "spotify:track:4A4A6dwl5DqdqrZaEtKGPR",
            // 1989 North America
            "spotify:track:59HjlYCeBsxdI0fcm3zglw",
            // 1989 (Deluxe) North America
            "spotify:track:106R7Z57WYzBAfrXImV30y",
            // rep surprise playlist
            "spotify:track:22C0JIVhFaczZ4t9heqREN",
            // BMRRS
            "spotify:track:3ScVaMDQwaD8iumBYzcDvr",
        ],
    },
    ...fearless,
    ...red,
];

export default spotify;
