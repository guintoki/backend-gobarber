"use strict";

require("reflect-metadata");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let authenticateUser;
describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'guilherme@gmail.com',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      email: 'guilherme@gmail.com',
      password: '123456'
    });
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non exist user', async () => {
    await expect(authenticateUser.execute({
      email: 'guilherme@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'guilherme@gmail.com',
      password: '123456'
    });
    await expect(authenticateUser.execute({
      email: 'guilherme@gmail.com',
      password: 'wrongpassword'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});