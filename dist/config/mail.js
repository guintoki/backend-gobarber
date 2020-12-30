"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'guilherme@guintoki.com',
      name: 'Guilherme Guintoki'
    }
  }
};
exports.default = _default;