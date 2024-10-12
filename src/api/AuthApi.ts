import type {
	SignUpReqSchema,
	SignUpResSchema,
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
}
