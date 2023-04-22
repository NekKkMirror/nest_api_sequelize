import { Response, Request } from 'express';

type ClientCookie<T> = {
	[Property in keyof T]: T[Property];
};

const cookieOptionsSet: ClientCookie<any> = {
	httpOnly: 'HttpOnly;',
	path: 'Path=/',
	domain: (host: string) => `Domain=${host};`,
	expires: (expires: string) => `Expires=${expires};`,
	signed: 'Signed=true;',
	secure: `Secure=${process.env.NODE_ENV === 'production'}`
};

export class ClientService {
	host: string;

	accessToken: string;

	refreshToken: string;

	cookie: ClientCookie<any>;

	preparedCookie: string[];

	constructor(
		private readonly request: Request,
		private readonly response: Response
	) {
		this.host = this.parseHost(this.request.headers.host);
		this.accessToken = '';
		this.refreshToken = '';
		this.cookie = {};
		this.preparedCookie = [];

		this.parseCookie();
	}

	static async getInstance(
		req: Request,
		res: Response
	): Promise<ClientService> {
		return new ClientService(req, res);
	}

	private parseHost(host: string) {
		if (!host) return 'no-host-name-in-http-headers';

		const portOffset = host.indexOf(':');

		if (portOffset > -1) return host.substring(0, portOffset);
	}

	parseCookie() {
		const cookie = this.request.cookies;

		console.log(cookie);
		if (!cookie) return;

		const entities = cookie.split(';');

		for (const entity of entities) {
			const parts = entity.split('=');
			const [key, value = ''] = parts;

			this.cookie[key.trim()] = value.trim();
		}
	}

	setCookie(key: string, value: string, cookieOptionsGet: ClientCookie<any>) {
		console.log(cookieOptionsGet);
		console.log(cookieOptionsSet);
		return true;
	}
}
