"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProviderDayAvaliabilityController = _interopRequireDefault(require("../controllers/ProviderDayAvaliabilityController"));

var _ProviderMonthAvaliabilityController = _interopRequireDefault(require("../controllers/ProviderMonthAvaliabilityController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const providersRouter = (0, _express.Router)();
const providersController = new _ProvidersController.default();
const providerDayAvaliabilityController = new _ProviderDayAvaliabilityController.default();
const providerMonthAvaliabilityController = new _ProviderMonthAvaliabilityController.default();
providersRouter.use(_ensureAuthenticated.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerMonthAvaliabilityController.index);
providersRouter.get('/:provider_id/day-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerDayAvaliabilityController.index);
var _default = providersRouter;
exports.default = _default;