const plugin = require('tailwindcss/plugin');

/**
 * @param {string} state 
 * @param {import('tailwindcss/types/config').PluginAPI} helpers 
 * 
 * * addVariant - for registering custom variants
 * * e - for manually escaping strings meant to be used in class names
 */
function addDataStateVariant(state, { addVariant, e, }) {

    addVariant(`data-state-${state}`,
        ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                //console.log(`------------- className = '${className}' state = '${state}'`);

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

/**
 * @param {string} state 
 * @param {import('tailwindcss/types/config').PluginAPI} helpers 
 * 
 * * addVariant - for registering custom variants
 * * e - for manually escaping strings meant to be used in class names
 */
function addDataVariant(state, { addVariant, e, }) {

    addVariant(`data-${state}`,
        ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                console.log(`------place------- className = '${className}' state = '${state}'`);

                return `.${e(`data-${state}${separator}${className}`)}[data-${state}]`;
            });
        }
    );

    addVariant(`group-data-${state}`,
        ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                console.log(`------group------- className = '${className}' state = '${state}'`);

                return `.group[data-${state}] .${e(`group-data-${state}${separator}${className}`)}`;
            });
        }
    );

    addVariant(`peer-data-${state}`,
        ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                console.log(`------peer------- className = '${className}' state = '${state}'`);

                return `.peer[data-${state}] ~ .${e(`peer-data-${state}${separator}${className}`)}`;
            });
        }
    );
}

module.exports = plugin(function (helpers) {
    // variants that help styling Radix-UI components
    addDataStateVariant('open', helpers);
    addDataStateVariant('closed', helpers);
    addDataStateVariant('on', helpers);
    addDataStateVariant('checked', helpers);
    addDataStateVariant('unchecked', helpers);

    addDataVariant('disabled', helpers);
    addDataVariant('highlighted', helpers);
    addDataVariant('placeholder', helpers);
});
