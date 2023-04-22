import { ServiceResponse } from './service-response.type';

export type Controller = {
	status: string;
};

export type ControllerResponse<D> = Controller & ServiceResponse<D>;
