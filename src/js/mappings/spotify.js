import album_1989 from "./1989";
import ARTIST_IDS from "./artists";
import fearless from "./fearless";
import red from "./red";
import speak_now from "./speak_now";

const spotify = [
    {
        name: "Safe & Sound - from The Hunger Games Soundtrack",
        replacement: "spotify:track:2RJnNdu4pb3MypbBroHU0T",
        artists: [ARTIST_IDS.TAYLOR, ARTIST_IDS.THE_CIVIL_WARS],
    },
    {
        name: "Eyes Open",
        replacement: "spotify:track:2NIBaWXdjaTDmytjjwbEfP",
    },
    {
        name: "If This Was a Movie",
        replacement: "spotify:track:0kAZ3H6G9Zac4PMpmobMkj",
    },
    ...fearless,
    ...red,
    ...speak_now,
    ...album_1989,
];

export default spotify;