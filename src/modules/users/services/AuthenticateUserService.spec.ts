import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'guilherme@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'guilherme@gmail.com',
      password: '123456',
    });

    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non exist user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'guilherme@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Fulano',
      email: 'guilherme@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'guilherme@gmail.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
