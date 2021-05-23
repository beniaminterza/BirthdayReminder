module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                violet: "#9b5de5",
                violetDark: "#894ad4",
                pink: "#f15bb5",
                lightWhite: "#bdc1c7",
                lightLightWhite: "#ebebeb",
                blue: "#00BBF9",
            },
            spacing: {
                "1/9": "90%",
                "0.75em": "0.6em",
                "1.5em": "1.5em",
            },
            maxWidth: {
                1400: "1400px",
            },
            borderRadius: {
                st: "0.3125em",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
