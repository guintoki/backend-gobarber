"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvaliabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvaliabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class ProviderDayAvaliabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderDayAvaliabilit = _tsyringe.container.resolve(_ListProviderDayAvaliabilityService.default);

    const avialibility = await listProviderDayAvaliabilit.execute({
      provider_id,
      day: Number(day),
      year: Number(year),
      month: Number(month)
    });
    return response.json(avialibility);
  }

}

exports.default = ProviderDayAvaliabilityController;