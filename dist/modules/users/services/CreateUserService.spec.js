"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

require("reflect-metadata");

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeHashProvider;
let fakeUsersRepository;
let createUser;
let fakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new _FakeHashProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    });
    await expect(createUser.execute({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});