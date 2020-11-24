/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LisProviderAppointmentsService from '@modules/appointments/services/LisProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const LisProviderAppointments = container.resolve(
      LisProviderAppointmentsService,
    );

    const appointments = await LisProviderAppointments.execute({
      day,
      month,
      year,
      provider_id,
    });

    return response.json(appointments);
  }
}
