const plugin = require('tailwindcss/plugin');
const defaultColors = require('tailwindcss/colors');

/**
 * 
 * @param {Record<string, string>[]} allColors 
 * @param {GroupOptions} o 
 * @returns {Record<string, string>}
 */
function buildColorsToBridge(allColors, o) {
    const colorGroup = o.vars ? o.vars : allColors[o.groupName] ? allColors[o.groupName] : defaultColors[o.groupName];

    const bridge = Object.fromEntries(
        Object.keys(colorGroup).map((colorKey) => [`${o.prefix}${o.groupNameOut || o.groupName}-${colorKey}`, colorGroup[colorKey],])
    );

    return bridge;
}

/**
 * @type {GroupOptions}
 */
const defOptions = {
    prefix: '--tm-',
    groupName: 'primary',
    groupNameOut: 'primary',
};

module.exports = plugin.withOptions(function (options) {
    return function ({ theme, addBase }) {
        const allColors = theme('colors');

        /**
         * @type {GroupOptions[]}
         */
        const arr = Array.isArray(options) ? options : [options];

        const bridge = arr.reduce(
            (acc, cur) => {
                const opts = { ...defOptions, ...cur };
                const bridge = buildColorsToBridge(allColors, opts);

                const selector = opts.useRoot ? ':root' : opts.customRoot ? opts.customRoot : '*, ::before, ::after'; // '*, ::before, ::after, ::backdrop' if need
                acc[selector] = {...acc[selector], ...bridge};

                return acc;
            }, {}
        );

        Object.entries(bridge).forEach(([sel, obj]) => addBase({ [sel]: obj }));
    };
});

/**
 * @typedef GroupOptions
 * @property {boolean} useRoot              // optional: root selector: useRoot ? ':root' : '*, ::before, ::after'; default false
 * @property {boolean} customRoot           // optional: custom root selector
 * @property {string} prefix                // optional: output color name prefix. default '--tm-'. It can be empty.
 * @property {string} groupName             // optional: source colors group name. default 'primary'.
 * @property {string} groupNameOut          // optional: output colors group name. default 'primary'.
 * @property {Record<string, string>} vars  // optional: self defined colors group. It can be any CSS props on the :root element.
 */

/*
Usage:
    colorsBridge({prefix: '--aa-', groupName: 'green'}),
    colorsBridge({ prefix: '--aa-', vars: twColors.slate },),

Usage:
    colorsBridge([
        {prefix: '--aa-', groupName: 'green'},
        {prefix: '--aa-', groupName: 'green', groupNameOut: 'me'},
        {prefix: '--aa-', groupName: 'green', groupNameOut: 'me', useRoot: true},
        {prefix: '--aa-', groupName: 'green', groupNameOut: 'me', customRoot: '.tm, ::backdrop'},
        {prefix: '--', groupNameOut: 'me', vars: {'abc1': 'red', 'abc2': 'pink' }},
    ]),

    will produce:

    :root {
        --aa-primary-50: #f0fdf4;
        --aa-primary-100: #dcfce7;
        --aa-primary-200: #bbf7d0;
        --aa-primary-300: #86efac;
        --aa-primary-400: #4ade80;
        --aa-primary-500: #22c55e;
        --aa-primary-600: #16a34a;
        --aa-primary-700: #15803d;
        --aa-primary-800: #166534;
        --aa-primary-900: #14532d;
        --aa-me-50: #f0fdf4;
        --aa-me-100: #dcfce7;
        --aa-me-200: #bbf7d0;
        --aa-me-300: #86efac;
        --aa-me-400: #4ade80;
        --aa-me-500: #22c55e;
        --aa-me-600: #16a34a;
        --aa-me-700: #15803d;
        --aa-me-800: #166534;
        --aa-me-900: #14532d;
        --me-abc1: red;
        --me-abc2: pink;
    }
*/
