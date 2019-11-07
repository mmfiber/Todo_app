const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
module.exports = {
  plugins: [
      new VuetifyLoaderPlugin(),
  ],
  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    },
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true // optional
          },
        },
      ],
    },]
  }
};