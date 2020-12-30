"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordService = _interopRequireDefault(require("../../../services/ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(request, response) {
    const {
      password,
      token
    } = request.body;

    const sendForgotPasswordEmail = _tsyringe.container.resolve(_ResetPasswordService.default);

    await sendForgotPasswordEmail.execute({
      password,
      token
    });
    return response.status(204).json();
  }

}

exports.default = ResetPasswordController;