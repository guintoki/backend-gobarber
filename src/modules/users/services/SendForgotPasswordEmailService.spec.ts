import AppError from '@shared/errors/AppError';

import 'reflect-metadata';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

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
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'guilherme@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'guidao',
      email: 'guilherme@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'guilherme@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
