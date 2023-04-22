export type ServiceResponse<D> = {
	success: boolean;
	message: string;
	data?: D;
};
