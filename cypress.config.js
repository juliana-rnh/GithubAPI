const dotenv = require('dotenv');
dotenv.config();

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      config.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN;
      
      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://nexdom.tec.br",
  },
});