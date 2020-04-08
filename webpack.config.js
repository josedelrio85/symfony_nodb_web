var Encore = require('@symfony/webpack-encore');
var webpack = require('webpack');
var dotenv = require('dotenv');

// Manually configure the runtime environment if not already configured yet by
// the "encore" command. It's useful when you use tools that rely on
// webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    .copyFiles({
      from: './assets/images',
      to: 'images/[path][name].[hash:8].[ext]',
      pattern: /\.(png|jpg|jpeg|pdf|svg)$/
    })

    .copyFiles({
      from: './assets/fonts',
      to: 'fonts/[path][name].[ext]',
      pattern: /\.(woff|woff2|ttf)$/
    })

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('main', './assets/css/main.scss')
    .addEntry('bysidecar', './assets/js/bysidecar.js')
    .addEntry('md5', './assets/js/md5.js')
    
    .enableSingleRuntimeChunk()

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel(function(babelConfig) {
      babelConfig.plugins = [
        "transform-object-rest-spread",
        "transform-class-properties"
      ]
    })

    // enables Sass/SCSS support
  .enableSassLoader( function(config) { config.modules= true; })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    .autoProvidejQuery()

     // define the environment variables
     .configureDefinePlugin(options => {
       if (Encore.isProduction()) {
        options['process.env'] = {
          LEADS_URL:               JSON.stringify(process.env.LEADS_URL),
          SOU_ID:            JSON.stringify(process.env.SOU_ID),
          PRODUCTION:              process.env.PRODUCTION,
        };
       }

       if (!Encore.isProduction()) {
        const env = dotenv.config();
        if (env.error) {
          throw env.error;
        }

        options['process.env'] = {
          LEADS_URL:               JSON.stringify(env.parsed.LEADS_URL),
          SOU_ID:            JSON.stringify(env.parsed.SOU_ID),
          PRODUCTION:              env.parsed.PRODUCTION,
        };
      }
    })
;

module.exports = Encore.getWebpackConfig();
