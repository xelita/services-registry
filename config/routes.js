/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    /*
     '/': {
     view: 'homepage'
     }
     */

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

    /*
     'GET /configs': 'AppConfigController.getAppConfigs',
     'GET /configs/:app': 'AppConfigController.getAppConfigsByApp',
     'GET /configs/:app/:env': 'AppConfigController.getAppConfigByAppAndEnv',
     'GET /configs/create': 'AppConfigController.create'
     */

    // APPS

    'GET /applications': 'AppConfigController.getApplications',
    'GET /applications/:app': 'AppConfigController.getApplication',
    'POST /applications': 'AppConfigController.addApplication',
    'PUT /applications/:app': 'AppConfigController.updateApplication',
    'DELETE /applications/:app': 'AppConfigController.removeApplication',

    // APPS / CONFIGS

    'GET /applications/:app/configs': 'AppConfigController.getConfigs',
    'PUT /applications/:app/configs': 'AppConfigController.setConfigs',
    'DELETE /applications/:app/configs': 'AppConfigController.removeConfigs',

    // APPS / CONFIGS // ENVS

    'GET /applications/:app/configs/:env': 'AppConfigController.getEnvConfigs',
    'PUT /applications/:app/configs/:env': 'AppConfigController.setEnvConfigs',
    'DELETE /applications/:app/configs/:env': 'AppConfigController.removeEnvConfigs',

    // APPS / CONFIGS // ENVS / CONFIG

    /*
     'GET /applications/:appName/configs/:env/config/:key': 'AppConfigController.getEnvConfig',
     'POST /applications/:appName/configs/:env/config/:key': 'AppConfigController.addEnvConfig',
     'DELETE /applications/:appName/configs/:env/config/:key': 'AppConfigController.removeEnvConfig'
     */
};
