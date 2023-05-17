const autoprefixer = require('autoprefixer');
const viewportHeightFix = require('postcss-100vh-fix');
const cssnano = require('cssnano');
const reporter = require('postcss-reporter');
// const stylelint = require('stylelint');

// OPÇÕES REPORTER
const reporterOptions = {
  clearReportedMessages: true,
};

// OPÇÕES CSSNANO
const cssnanoOptions = { preset: ['default', { minifySelectors: false }] };

// CONFIGURAÇÃO POSTCSS
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    viewportHeightFix(),
    autoprefixer(),
    cssnano(cssnanoOptions),
    // stylelint(),
    reporter(reporterOptions),
  ],
};

module.exports = config;
