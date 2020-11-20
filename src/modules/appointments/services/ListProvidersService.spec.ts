import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Fulano1',
      email: 'fulano1@tefulano.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Fulano3',
      email: 'fulan3o@tefulano.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Fulano4',
      email: 'fulano4@tefulano.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});