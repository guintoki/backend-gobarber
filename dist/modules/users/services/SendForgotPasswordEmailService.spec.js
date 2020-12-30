"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

require("reflect-metadata");

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should be able to recover password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'guidao',
      email: 'guilherme@gmail.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'guilherme@gmail.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not to be able to recover password using the email non existing', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'guilherme@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'guidao',
      email: 'guilherme@gmail.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'guilherme@gmail.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});