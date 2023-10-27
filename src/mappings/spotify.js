import album_1989 from "./1989";
import fearless from "./fearless";
import red from "./red";
import speak_now from "./speak_now";

const spotify = [
    // Single - Safe & Sound 
    {
        "replacement": "spotify:track:2RJnNdu4pb3MypbBroHU0T",
        "originals": [
            // The Hunger Games: Songs From District 12 And Beyond
            "spotify:track:0z9UVN8VBHJ9HdfYsOuuNf",
            "spotify:track:4yTqjWF2EoFJM5BbSCe4YW",
            // Weekend @ Home
            "spotify:track:2zyQext0Pw8Jx2HH1OtyQD",
        ],
    },
    // Single - Eyes Open
    {
        "replacement": "spotify:track:2NIBaWXdjaTDmytjjwbEfP",
        "originals": [
            // The Hunger Games: Songs From District 12 And Beyond
            "spotify:track:7wjbSn8QHsxqKXU5M0jXGM",
            "spotify:track:6KEemo78n0RnCQWKkeOdXz",
        ],
    },
    // Single - If This Was a Movie
    {
        "replacement": "spotify:track:0kAZ3H6G9Zac4PMpmobMkj",
        "originals": [
            // Speak Now (Deluxe Package)
            "spotify:track:0vvt4IZOMkRug195S4MUq0",
            "spotify:track:5tSmAABuoOfR59lrtXdDqm",
        ],
    },
    ...fearless,
    ...red,
    ...speak_now,
    ...album_1989,
];

export default spotify;
