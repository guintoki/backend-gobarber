"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeHashProvider;
let fakeUsersRepository;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new _FakeHashProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Fulanu',
      email: 'fulano2@fulano.com'
    });
    expect(updatedUser.name).toBe('Fulanu');
    expect(updatedUser.email).toBe('fulano2@fulano.com');
  });
  it('should not be able to show profile without user id', async () => {
    expect(updateProfile.execute({
      name: 'teste',
      email: 'teste@exempla.com.br',
      user_id: 'nonexistinguserid'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update profile email to an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@tefulano.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Fulanu',
      email: 'fulano@tefulano.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update only password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Fulanu',
      email: 'fulano2@fulano.com',
      old_password: '123456',
      password: '111111'
    });
    expect(updatedUser.password).toBe('111111');
  });
  it('should not be able to update only password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Fulanu',
      email: 'fulano2@fulano.com',
      password: '111111'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update only password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Fulanu',
      email: 'fulano2@fulano.com',
      password: '111111',
      old_password: '123111'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});