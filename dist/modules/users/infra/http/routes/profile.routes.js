"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ProfileController = _interopRequireDefault(require("../controllers/ProfileController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
const profileRouter = (0, _express.Router)();
const profileController = new _ProfileController.default();
profileRouter.use(_ensureAuthenticated.default);
profileRouter.put('/', profileController.update);
profileRouter.get('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string(),
    password_confirmation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password')),
    old_password: _celebrate.Joi.string()
  }
}), profileController.show);
var _default = profileRouter;
exports.default = _default;