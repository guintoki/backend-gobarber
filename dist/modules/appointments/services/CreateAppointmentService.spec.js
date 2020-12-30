"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */
let fakeAppointmentsRepository;
let createAppointment;
let fakeNotificationsRepository;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new Appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'userTest',
      provider_id: '123123123'
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
      provider_id: '123123123'
    });
    await expect(createAppointment.execute({
      user_id: 'userTest',
      date: appointmentDate,
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a Appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      user_id: 'userTest',
      date: new Date(2020, 4, 10, 11),
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a Appointment with user id equal provider id', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });
    await expect(createAppointment.execute({
      user_id: '123123123',
      date: new Date(2020, 4, 10, 11),
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a Appointment with after the hour comercial', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });
    await expect(createAppointment.execute({
      user_id: 'user_id',
      date: new Date(2020, 4, 11, 7),
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});