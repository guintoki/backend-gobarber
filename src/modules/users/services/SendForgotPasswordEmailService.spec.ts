import AppError from '@shared/errors/AppError';

import 'reflect-metadata';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'guidao',
      email: 'guilherme@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'guilherme@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not to be able to recover password using the email non existing', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'guilherme@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
