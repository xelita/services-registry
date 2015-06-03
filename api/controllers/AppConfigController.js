/**
 * AppConfigController
 *
 * @description :: Server-side logic for managing Applications and their configurations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // APPS

    /**
     * `ApplicationController.getApplications()`
     */
    getApplications: function (req, res) {
        // Waterline call
        Application.find().exec(function (err, results) {
            if (err) {
                res.serverError(err);
            }
            return res.json(results);
        });
    },

    /**
     * `ApplicationController.getApplication()`
     */
    getApplication: function (req, res) {
        // Extract needed information
        var app = req.param('app');

        // Waterline call
        Application.findOne({app: app}).exec(function (err, result) {
            if (err) {
                res.serverError(err);
            }
            if (!result) {
                res.notFound('application ' + app + ' not found.');
            }
            return res.json(result);
        });
    },

    /**
     * `ApplicationController.addApplication()`
     */
    addApplication: function (req, res) {
        // Get request payload
        var data = req.body;

        // Extract needed information
        var app = data.app;

        // Waterline call
        Application.findOrCreate({app: app}, {app: app}).exec(function (err, results) {
            if (err) {
                res.serverError(err);
            }
            if (!results || results.length == 0) {
                res.notFound('application ' + app + ' could not be created found.');
            }
            return res.json(results[0]);
        });
    },

    /**
     * `ApplicationController.getApplication()`
     */
    removeApplication: function (req, res) {
        // Extract needed information
        var app = req.param('app');

        // Waterline call
        Application.destroy({app: app}).exec(function (err) {
            if (err) {
                res.serverError(err);
            }
            return res.json(null);
        });
    },

    // APPS / CONFIGS

    /**
     * `ApplicationController.getConfigs()`
     */
    getConfigs: function (req, res) {
        // Extract needed information
        var app = req.param('app');

        // Waterline call
        Application.findOne({app: app}).exec(function (err, result) {
            if (err) {
                res.serverError(err);
            }
            if (!result) {
                res.notFound('application ' + app + ' not found.');
            }
            return res.json(result.configs);
        });
    },

    /**
     * `ApplicationController.addConfigs()`
     */
    addConfigs: function (req, res) {
        // Get request payload
        var data = req.body;

        // Extract needed information
        var app = req.param('app');
        var configs = data.configs;

        // Waterline call
        Application.update({app: app}, {configs: configs}).exec(function (err, results) {
            if (err) {
                res.serverError(err);
            }
            if (!results || results.length == 0) {
                res.notFound('application ' + app + ' not found.');
            }
            return res.json(result.configs);
        });
    },

    /**
     * `ApplicationController.addConfigs()`
     */
    removeConfigs: function (req, res) {
        // Extract needed information
        var app = req.param('app');

        // Waterline call
        Application.update({app: app}, {configs: []}).exec(function (err, results) {
            if (err) {
                res.serverError(err);
            }
            if (!results || results.length == 0) {
                res.notFound('application ' + app + ' not found.');
            }
            return res.json(result.configs);
        });
    },

    //

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
            configuration.findOrCreate({application: app.id, env: 'development'}, {
                application: app.id,
                env: 'development',
                data: [{backendBaseUrl: 'http://localhost:1337'}]
            }).exec(function (err, app) {
                if (err) {
                    res.serverError(err);
                }
                return res.json(app);
            });
        });
    }
};

