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
                return res.serverError(err);
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
                return res.serverError(err);
            }
            if (!result) {
                return res.notFound('application [' + app + '] not found.');
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
                return res.serverError(err);
            }
            return res.json(result);
        });
    },

    /**
     * `ApplicationController.updateApplication()`
     */
    updateApplication: function (req, res) {
        // Get request payload
        var data = req.body;

        // Extract needed information
        var app = req.param('app');
        var newApp = data.app || app;
        var newConfigs = data.configs || [];

        // Waterline call
        Application.update({app: app}, {app: newApp, configs: newConfigs}).exec(function (err, results) {
            if (err) {
                return res.serverError(err);
            }
            if (!results || results.length == 0) {
                return res.notFound('application [' + app + '] not found.');
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
        Application.findOne({app: app}).exec(function (err, result) {
            if (err) {
                return res.serverError(err);
            }
            if (!result) {
                return res.notFound('application [' + app + '] not found.');
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
                return res.serverError(err);
            }
            if (!result) {
                return res.notFound('application ' + app + ' not found.');
            }
            return res.json(result.configs);
        });
    },

    /**
     * `ApplicationController.setConfigs()`
     */
    setConfigs: function (req, res) {
        // Get request payload
        var data = req.body;

        // Extract needed information
        var app = req.param('app');
        var configs = data.configs;

        // Waterline call
        Application.update({app: app}, {configs: configs}).exec(function (err, results) {
            if (err) {
                return res.serverError(err);
            }
            if (!results || results.length == 0) {
                return res.notFound('application ' + app + ' not found.');
            }
            return res.json(results[0].configs);
        });
    },

    /**
     * `ApplicationController.removeConfigs()`
     */
    removeConfigs: function (req, res) {
        // Extract needed information
        var app = req.param('app');

        // Waterline call
        Application.update({app: app}, {configs: []}).exec(function (err, results) {
            if (err) {
                return res.serverError(err);
            }
            if (!results || results.length == 0) {
                return res.notFound('application ' + app + ' not found.');
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
        Application.findOne({app: app, 'configs.env': env}).exec(function (err, result) {
            if (err) {
                return res.serverError(err);
            }
            if (!result || !result.configs[0]) {
                return res.notFound('no env [' + env + '] exists for app [' + app + '].');
            }
            return res.json(result.configs[0].data);
        });
    },

    /**
     * `ApplicationController.setEnvConfigs()`
     */
    setEnvConfigs: function (req, res) {
        // Get request payload
        var data = req.body;

        // Extract needed information
        var app = req.param('app');
        var env = req.param('env');
        var configs = data.data;

        // Waterline call
        Application.update({app: app, 'configs.env': env}, {'configs.$.data': configs}).exec(function (err, results) {
            if (err) {
                return res.serverError(err);
            }
            if (!results || results.length == 0) {
                return res.notFound('no env [' + env + '] exists for app [' + env + '].');
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
        Application.destroy({app: app, 'configs.env': env}).exec(function (err) {
            if (err) {
                return res.serverError(err);
            }
            return res.json();
        });
    }
};

