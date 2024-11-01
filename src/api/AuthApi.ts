import type {
	SignUpReqSchema,
	SignUpResSchema,
	SignInReqSchema,
	RestoreReqSchema,
} from 'common/schemas';

export class AuthApi {
	private static headers = {
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	};

	static async signUp(data: SignUpReqSchema): Promise<SignUpResSchema> {
		const res = await fetch('/api/signup', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(data),
		});

		const json = await res.json();

		return json;
	}

	static async signIn(data: SignInReqSchema): Promise<boolean> {
		const res = await fetch('/api/signin', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(data),
		});

		return res.status === 200;
	}

	static async getTokens(login: string): Promise<boolean> {
		const res = await fetch('/api/refresh-token', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({login}),
		});

		return res.status === 200;
	}

	static async restore(data: RestoreReqSchema): Promise<boolean> {
		const res = await fetch('/api/restore', {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(data),
		});

		return res.status === 200;
	}
}
