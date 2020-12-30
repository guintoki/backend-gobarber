"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderDayAvaliabilityService = _interopRequireDefault(require("./ListProviderDayAvaliabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderDayAvaliability;
describe('ListProviderDayhAvaliability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderDayAvaliability = new _ListProviderDayAvaliabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list day avaliability providers', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'userTest',
      date: new Date(2020, 4, 22, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'userTest',
      date: new Date(2020, 4, 22, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 22, 11).getTime();
    });
    const availability = await listProviderDayAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 22
    });
    expect(availability).toEqual(expect.arrayContaining([{
      avaliable: false,
      hour: 8
    }, {
      avaliable: false,
      hour: 9
    }, {
      avaliable: false,
      hour: 10
    }, {
      avaliable: false,
      hour: 14
    }, {
      avaliable: false,
      hour: 15
    }, {
      avaliable: true,
      hour: 16
    }, {
      avaliable: true,
      hour: 13
    }]));
  });
});