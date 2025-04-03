import { signUpReqSchema, signUpResSchema } from "~/schemas";

export const useSignUpApi = () => {
	const config = useRuntimeConfig();
	const { apiBase } = config.public;

	const execute = async (payload: {
		rules: boolean;
		cookie: boolean;
		personal: boolean;
	}) => {
		const validated = await signUpReqSchema.body.validateAsync(payload);

		const response = await $fetch(`${apiBase}/api/signup`, {
			method: "POST",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
			body: validated,
		});
		const validatedResponse = await signUpResSchema.validateAsync(response);

		return validatedResponse;
	};

	return { execute };
};
