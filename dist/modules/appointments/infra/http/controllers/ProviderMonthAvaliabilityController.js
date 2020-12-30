"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderMonthAvaliabilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvaliabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class ProviderMonthAvaliabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      month,
      year
    } = request.query;

    const listProviderMonthAvaliabilit = _tsyringe.container.resolve(_ListProviderMonthAvaliabilityService.default);

    const avialibility = await listProviderMonthAvaliabilit.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    });
    return response.json(avialibility);
  }

}

exports.default = ProviderMonthAvaliabilityController;