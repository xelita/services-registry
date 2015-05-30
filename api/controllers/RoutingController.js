/**
 * RoutingController
 *
 * @description :: Server-side logic for managing routings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

//db.routing.find({ app: 'stw', urls: { $elemMatch: { env: 'production' }}}, { urls: { $elemMatch: { env: 'production' }}} )

  /**
   * `RoutingController.getRoutingByAppNameAndEnv()`
   */
  getRoutingByAppAndEnv: function (req, res) {

    // Using native query on sails-mongo because, projection based on array are not supporter by the waterline select keyword! 
    Routing.native(function(err, collection) {
      collection.findOne({ app: req.param('app'), urls: { $elemMatch: { env: req.param('env') }}}, { urls: { $elemMatch: { env: req.param('env') }}}, function (err, route) {
        return res.json(route);
      });
    });
  },

  /**
   * `RoutingController.getRoutingsByAppName()`
   */
  getRoutingsByApp: function (req, res) {
    Routing.findOne({ where: { app: req.param('app') } }).exec(function(err, route) {
      return res.json(route);
    });
  },

  /**
   * `RoutingController.getRoutings()`
   */
  getRoutings: function (req, res) {
    Routing.find({}).exec(function(err, routes) {
      return res.json(routes);
    });
  }
};

