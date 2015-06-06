/**
 * Configuration.js
 *
 * @description :: Configuration model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    autoCreatedAt: false,
    autoUpdatedAt: false,
    
    attributes: {
        env: {
            type: 'string',
            required: true
        },
        data: {
            type: 'array',
            required: true,
            defaultsTo: []
        },
        app: {
            model: 'application'
        }
    }
};

