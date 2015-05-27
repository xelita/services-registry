/**
 * RoutingController
 *
 * @description :: Server-side logic for managing routings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `RoutingController.getRoutingByAppNameAndEnv()`
   */
  getRoutingByAppAndEnv: function (req, res) {
    Routing.findOne({ where: { app: req.param('app') } }, { urls: { $elemMatch: { env: req.param('env') } } }).exec(function(err, route) {
      return res.json(route);
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

