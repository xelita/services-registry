/**
 * AppConfigController
 *
 * @description :: Server-side logic for managing Applications and their configurations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * `ApplicationController.getAppConfigByAppAndEnv()`
     */
    getAppConfigByAppAndEnv: function (req, res) {

        // Using native query on sails-mongo because, projection based on array are not supporter by the waterline select keyword!
        Application.native(function (err, collection) {
            if (err) {
                res.serverError(err);
            }
            collection.findOne({
                app: req.param('app'),
                urls: {$elemMatch: {env: req.param('env')}}
            }, {urls: {$elemMatch: {env: req.param('env')}}}, function (err, configuration) {
                if (err) {
                    res.serverError(err);
                }
                if (!configuration) {
                    res.notFound();
                }
                return res.json(configuration);
            });
        });
    },

    /**
     * `ApplicationController.getAppConfigsByApp()`
     */
    getAppConfigsByApp: function (req, res) {
        Application.findOne({where: {app: req.param('app')}}).exec(function (err, configuration) {
            if (err) {
                res.serverError(err);
            }
            if (!configuration) {
                res.notFound();
            }
            return res.json(configuration);
        });
    },

    /**
     * `ApplicationController.getAppConfigs()`
     */
    getAppConfigs: function (req, res) {
        Application.find().populate('configs').exec(function (err, configurations) {
            if (err) {
                res.serverError(err);
            }
            if (!configurations || configurations.length == 0) {
                res.notFound();
            }
            return res.json(configurations);
        });
    },

    create: function (req, res) {
        Application.findOrCreate({app: 'stw'}).exec(function (err, app) {
            if (err) {
                res.serverError(err);
            }
            sails.log(app);
            configuration.findOrCreate({application: app.id, env: 'development'}, {application: app.id, env: 'development', data: [{backendBaseUrl: 'http://localhost:1337'}]}).exec(function (err, app) {
                if (err) {
                    res.serverError(err);
                }
                return res.json(app);
            });
        });
    }
};

