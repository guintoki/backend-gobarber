import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaliabilityService from './ListProviderDayAvaliabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvaliability: ListProviderDayAvaliabilityService;

describe('ListProviderDayhAvaliability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvaliability = new ListProviderDayAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list day avaliability providers', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 22, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 22, 10, 0, 0),
    });

    const availability = await listProviderDayAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 22,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { avaliable: false, hour: 8 },
        { avaliable: true, hour: 9 },
        { avaliable: false, hour: 10 },
        { avaliable: true, hour: 11 },
      ]),
    );
  });
});
