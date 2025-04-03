import { signInReqSchema } from "~/schemas";

export const useSignInApi = () => {
	const config = useRuntimeConfig();
	const { apiBase } = config.public;

	const execute = async (login: string, password: string) => {
		const validated = await signInReqSchema.body.validateAsync({
			login,
			password,
		});

		return await $fetch(`${apiBase}/api/signin`, {
			method: "POST",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
			body: validated,
		});
	};

	return { execute };
};
