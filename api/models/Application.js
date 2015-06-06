/**
 * Application.js
 *
 * @description :: Application model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
        app: {
            type: 'string',
            primaryKey: true,
            required: true
        },
        configs: {
            type: 'array',
            defaultsTo: []
        }
    }
};

