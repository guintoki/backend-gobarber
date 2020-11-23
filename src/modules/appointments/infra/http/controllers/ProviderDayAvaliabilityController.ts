/* eslint-disable camelcase */
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProviderDayAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderDayAvaliabilit = container.resolve(
      ListProviderDayAvaliabilityService,
    );

    const avialibility = await listProviderDayAvaliabilit.execute({
      provider_id,
      day,
      year,
      month,
    });

    return response.json(avialibility);
  }
}
