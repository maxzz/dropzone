const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addVariant, e }) {
    // webkit thumb
    addVariant('thumb-w', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`thumb-w${separator}${className}`)}::-webkit-slider-thumb`;
        });
    });

    // mozilla thumb
    addVariant('thumb-m', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`thumb-m${separator}${className}`)}::-moz-range-thumb`;
        });
    });

    // webkit track
    addVariant('track-w', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`track-w${separator}${className}`)}::-webkit-slider-runnable-track`;
        });
    });

    // mozilla track
    addVariant('track-m', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`track-m${separator}${className}`)}::-moz-range-track`;
        });
    });
});
