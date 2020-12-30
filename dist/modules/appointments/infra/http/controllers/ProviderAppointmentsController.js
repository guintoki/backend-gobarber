"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _LisProviderAppointmentsService = _interopRequireDefault(require("../../../services/LisProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class ProviderAppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      month,
      year
    } = request.query;

    const LisProviderAppointments = _tsyringe.container.resolve(_LisProviderAppointmentsService.default);

    const appointments = await LisProviderAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id
    });
    return response.json(appointments);
  }

}

exports.default = ProviderAppointmentsController;