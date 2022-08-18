const plugin = require('tailwindcss/plugin');

/**
 * @param {string} state 
 * @param {import('tailwindcss/types/config').PluginAPI} helpers 
 * 
 * * addVariant - for registering custom variants
 * * e - for manually escaping strings meant to be used in class names
 */
function dataStateVariant(state, { addVariant, e, }) {

    addVariant(`data-state-${state}`,
        ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                console.log(`------------- className = '${className}' state = '${state}'`);
                
                return `.${e(`data-state-${state}${separator}${className}`)}[data-state='${state}']`;
            });
        }
    );

    addVariant(`group-data-state-${state}`,
        ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                return `.group[data-state='${state}'] .${e(`group-data-state-${state}${separator}${className}`)}`;
            });
        }
    );

    addVariant(`peer-data-state-${state}`,
        ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                return `.peer[data-state='${state}'] ~ .${e(`peer-data-state-${state}${separator}${className}`)}`;
            });
        }
    );

}

module.exports = plugin(function (helpers) {
    // variants that help styling Radix-UI components
    dataStateVariant('open', helpers);
    dataStateVariant('closed', helpers);
    dataStateVariant('on', helpers);
    dataStateVariant('checked', helpers);
    dataStateVariant('unchecked', helpers);
});
