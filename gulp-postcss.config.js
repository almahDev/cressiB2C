const postcssStylelint = require('stylelint');
const postcssReporter = require('postcss-reporter');
const postcssScss = require('postcss-scss');

// OPÇÕES REPORTER
const reporterOptions = {
  clearReportedMessages: true,
};

// CONFIGURAÇÃO POSTCSS
const config = {
  plugins: [postcssStylelint(), postcssReporter(reporterOptions)],
  options: {
    parser: postcssScss,
  },
};

module.exports = config;
