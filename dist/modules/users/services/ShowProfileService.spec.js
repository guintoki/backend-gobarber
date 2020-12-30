"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeUsersRepository;
let showProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('Fulano');
    expect(profile.email).toBe('fulano@tefulano.com');
  });
  it('should not be able to show profile without user id', async () => {
    expect(showProfile.execute({
      user_id: 'nonexistinguserid'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});