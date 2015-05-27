/**
 * Routing.js
 *
 * @description :: Routing model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        app: {
            type: 'string',
            primaryKey: true,
            required: true
        },
        urls: {
            type: 'array',
            required: true,
            defaultsTo: []
        }
    }
};

