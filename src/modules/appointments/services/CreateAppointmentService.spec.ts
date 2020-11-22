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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'userTest',
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two Appointment on the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      user_id: 'userTest',
      date: appointmentDate,
      provider_id: '123123123',
    });

    await expect(
      createAppointment.execute({
        user_id: 'userTest',
        date: appointmentDate,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a Appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: 'userTest',
        date: new Date(2020, 4, 10, 11),
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a Appointment with user id equal provider id', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: '123123123',
        date: new Date(2020, 4, 10, 11),
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a Appointment with after the hour comercial', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    await expect(
      createAppointment.execute({
        user_id: 'user_id',
        date: new Date(2020, 4, 11, 7),
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
