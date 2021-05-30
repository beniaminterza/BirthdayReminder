module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                creme: "#FFCCD7",
                cremeDark: "#ffb3c3",
                pink: "#f296ba",
                pinkDark: "#de2c72",
                lightWhite: "#393939",
                lightLightWhite: "#ebebeb",
                blue: "#44a7f2",
                yellow: "#fcfc60",
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
