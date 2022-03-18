const path = require("path");

module.exports = {
  entry: "./src/accessibility.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "site/script"),
    libraryTarget: "umd",
    filename: "accessibility.min.js",
    auxiliaryComment: "accessibility output",
  },
};
