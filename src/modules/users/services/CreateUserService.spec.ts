import AppError from '@shared/errors/AppError';

import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const appointment = await createUser.execute({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Fulano',
      email: 'fulano@tefulano.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Fulano',
        email: 'fulano@tefulano.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
