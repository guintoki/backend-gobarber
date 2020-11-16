import AppError from '@shared/errors/AppError';

import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Fulano',
        email: 'fulano@tefulano.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
