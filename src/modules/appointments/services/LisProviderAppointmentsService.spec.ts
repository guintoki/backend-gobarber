import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import LisProviderAppointmentsService from './LisProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let lisProviderAppointmentsService: LisProviderAppointmentsService;

describe('LisProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    lisProviderAppointmentsService = new LisProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list day avaliability appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'userTest',
      date: new Date(2020, 4, 22, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'userTest',
      date: new Date(2020, 4, 22, 15, 0, 0),
    });

    const appointments = await lisProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 22,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
