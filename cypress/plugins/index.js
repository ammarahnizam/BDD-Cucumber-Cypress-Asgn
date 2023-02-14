const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const nodePolyfills = require('@esbuild-plugins/node-modules-polyfill').NodeModulesPolyfillPlugin;
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
module.exports = async(on, config) => {
    await addCucumberPreprocessorPlugin(on, config);
    on(
        'file:preprocessor',
        createBundler({
            plugins: [nodePolyfills(), createEsbuildPlugin(config)],
        }),
    );
    return config;
}