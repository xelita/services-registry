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
                res.notFound('application [' + app + '] not found.');
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
        var configs = data.configs || [];

        // Waterline call
        Application.create({app: app, configs: configs}).exec(function (err, result) {
            if (err) {
                res.serverError(err);
            }
            return res.json(result);
        });
    },

    /**
     * `ApplicationController.getApplication()`
     */
    removeApplication: function (req, res) {
        // Extract needed information
        var app = req.param('app');

        // Waterline call
        Application.findOne({app: app}).exec(function (err, result) {
            if (err) {
                res.serverError(err);
            }
            if (!result) {
                res.notFound('application [' + app + '] not found.');
            }

            Application.destroy({app: app}).exec(function (err) {
                if (err) {
                    res.serverError(err);
                }
                return res.json();
            });
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
            return res.json(null);
        });
    },

    // APPS / CONFIGS / ENV

    /**
     * `ApplicationController.getEnvConfigs()`
     */
    getEnvConfigs: function (req, res) {
        // Extract needed information
        var app = req.param('app');
        var env = req.param('env');

        // Waterline call
        // Using native query on sails-mongo because, projection based on array are not supporter by the waterline select keyword!
        Application.native(function (err, collection) {
            if (err) {
                res.serverError(err);
            }
            collection.findOne({
                app: app,
                configs: {$elemMatch: {env: env}}
            }, {configs: {$elemMatch: {env: env}}}, function (err, result) {
                if (err) {
                    res.serverError(err);
                }
                if (!result || !result.configs[0]) {
                    res.notFound('no env [' + env + '] exists for app [' + env + '].');
                }
                return res.json(result.configs[0].data);
            });
        });
    },

    /**
     * `ApplicationController.addEnvConfigs()`
     */
    addEnvConfigs: function (req, res) {
        // Get request payload
        var data = req.body;

        // Extract needed information
        var app = req.param('app');
        var env = req.param('env');
        var configs = data.data;

        // Waterline call
        Application.update({app: app, 'configs.env': env}, {'configs.$.data': configs}).exec(function (err, results) {
            if (err) {
                res.serverError(err);
            }
            if (!results || results.length == 0) {
                res.notFound('no env [' + env + '] exists for app [' + env + '].');
            }
            return res.json(result.configs);
        });
    },

    /**
     * `ApplicationController.removeEnvConfigs()`
     */
    removeEnvConfigs: function (req, res) {
        // Extract needed information
        var app = req.param('app');
        var env = req.param('env');

        // Waterline call
        // Using native query on sails-mongo because, projection based on array are not supporter by the waterline select keyword!
        Application.native(function (err, collection) {
            if (err) {
                res.serverError(err);
            }
            collection.update({
                app: app,
                'configs.env': env
            }, {$pull: {configs: {'configs.env': env}}}, function (err, configuration) {
                if (err) {
                    res.serverError(err);
                }
                if (!configuration) {
                    res.notFound();
                }
                return res.json(null);
            });
        });
    }
};

