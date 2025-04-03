import { restoreReqSchema } from "~/schemas";

export const useRestoreApi = () => {
	const config = useRuntimeConfig();
	const { apiBase } = config.public;

	const execute = async (login: string) => {
		const validated = await restoreReqSchema.body.validateAsync({ login });

		return await $fetch(`${apiBase}/api/restore`, {
			method: "POST",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
			body: { login: validated },
		});
	};

	return { execute };
};
