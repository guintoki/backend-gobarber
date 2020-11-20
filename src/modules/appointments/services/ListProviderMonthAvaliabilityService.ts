/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  avaliable: boolean;
}>;

@injectable()
class ListProviderMonthAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appoitments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appoitmentsInDay = appoitments.filter(appoitment => {
        return getDate(appoitment.date) === day;
      });

      return {
        day,
        avaliable: appoitmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvaliabilityService;
