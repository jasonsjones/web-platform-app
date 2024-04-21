module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            parserOpts: {
                plugins: ['classProperties', ['decorators', { decoratorsBeforeExport: false }]]
            }
        }
    },
    extends: ['prettier'],
    plugins: ['prettier'],

    rules: {
        'prettier/prettier': 'error'
    }
};
