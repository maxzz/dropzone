const plugin = require("tailwindcss/plugin");

module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{tsx,ts,jsx,js}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            // 'sbColor': (theme) => ({
            //     ...theme('colors')
            // })
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addComponents }) {
            const newComponents = {
                ".scrollbar-w-2::-webkit-scrollbar": {
                    width: ".5rem !important",
                    height: ".5rem !important",
                },
                ".scrollbar-thumb-rounded::-webkit-scrollbar-thumb": {
                    borderRadius: ".25rem !important",
                },
                ".scrollbar-thumb-gray::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(156, 163, 175, 1) !important",
                },
                ".scrollbar-track-gray-lighter::-webkit-scrollbar-track": {
                    backgroundColor: "rgba(209, 213, 219, 1) !important",
                },
                ".scrollbar-thumb-transparent::-webkit-scrollbar-thumb": {
                    backgroundColor: "transparent",
                },
                ".scrollbar-track-transparent::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                },
            };
            addComponents(newComponents, {
                variants: ["responsive"],
            });
        }),
    ],
}
