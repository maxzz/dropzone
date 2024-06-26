const plugin = require("tailwindcss/plugin");
const colors = require('tailwindcss/colors');

const customAdditionsPlugin = plugin(function ({ addComponents }) {
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
});

module.exports = {
    content: ['./index.html', './src/**/*.{tsx,ts,jsx,js}'],
    //darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: colors.slate,
                ui: {
                    bg: colors.slate[100],
                    text: '#5a3543',
                },
            },
            ...require('./tailwind/tailwind-extra-animations').extraAnimations,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        customAdditionsPlugin,
        require('./tailwind/tailwind-plugin-debug-styles'),
        require('./tailwind/tailwind-plugin-debug-screens'),
        require('./tailwind/tailwind-plugin-colors-bridge')([
            { prefix: '--tm-', groupName: 'primary' },
            { prefix: '--tm-', groupName: 'ui', groupNameOut: 'ui' },
        ]),
        require('./tailwind/tailwind-plugin-overflow-overlay'),
        require('./tailwind/tailwind-plugin-data-state'),
        require('tailwindcss-radix')(),
        require('@tailwindcss/forms')({ strategy: 'class' }),
    ],
};
