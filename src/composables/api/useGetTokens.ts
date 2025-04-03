export const useGetTokens = () => {
	const config = useRuntimeConfig();
	const { apiBase } = config.public;

	const execute = async (login: string) => {
		return await $fetch(`${apiBase}/api/refresh-token`, {
			method: "POST",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
			body: { login },
		});
	};

	return { execute };
};
