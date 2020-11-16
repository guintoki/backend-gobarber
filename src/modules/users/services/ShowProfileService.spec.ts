// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Fulano');
    expect(profile.email).toBe('fulano@tefulano.com');
  });

  it('should not be able to show profile without user id', async () => {
    expect(
      showProfile.execute({
        user_id: 'nonexistinguserid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
