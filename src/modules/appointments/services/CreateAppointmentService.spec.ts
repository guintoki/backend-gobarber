import AppError from '@shared/errors/AppError';

import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new Appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'userTest',
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two Appointment on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      user_id: 'userTest',
      date: appointmentDate,
      provider_id: '123123123',
    });

    expect(
      createAppointment.execute({
        user_id: 'userTest',
        date: appointmentDate,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
