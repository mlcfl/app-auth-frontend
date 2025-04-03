<style lang="scss" module>
.form {
	max-width: 320px;
	width: 100%;
}
</style>

<template>
	<div :class="$style.form">
		<div class="text-h4 pb-6 text-center">Sign In</div>
		<VCard variant="outlined" class="px-6 py-8">
			<VForm v-model="form" @submit.prevent="onSubmit">
				<VTextField
					v-model="login"
					variant="outlined"
					class="mb-2"
					label="Login"
					autocomplete="username"
					:disabled="loading"
					:rules="[required]"
				/>
				<VTextField
					v-model="password"
					variant="outlined"
					label="Password"
					autocomplete="current-password"
					:type="passwordHidden ? 'password' : 'text'"
					:disabled="loading"
					:rules="[required]"
				>
					<template #append-inner>
						<v-icon
							:title="passwordHidden ? 'Show password' : 'Hide password'"
							:icon="passwordHidden ? 'mdi-eye-off' : 'mdi-eye'"
							@click="passwordHidden = !passwordHidden"
						/>
					</template>
				</VTextField>
				<VBtn
					type="submit"
					variant="outlined"
					size="large"
					class="mt-2"
					block
					:disabled="!form"
					:loading="loading"
				>
					Sign In
				</VBtn>
				<div v-if="error" class="mt-2 text-body-2 text-error">{{ error }}</div>
			</VForm>
			<div class="d-flex flex-column align-center mt-4 ga-1">
				<VBtn to="/signup" variant="text" size="small">Create account</VBtn>
				<VBtn to="/restore" variant="text" size="small">Restore account</VBtn>
			</div>
		</VCard>
	</div>
</template>

<script lang="ts" setup>
import { useGetTokens, useSignInApi } from "~/composables";

const form = ref(false);
const login = ref("");
const password = ref("");
const loading = ref(false);
const passwordHidden = ref(true);

const required = (v: string) => Boolean(v) || "Required field";

const url = useRequestURL();
const rootUrl = computed(() => {
	const { protocol, hostname, port } = url;

	const parts = hostname.split(".");
	const domain = parts.slice(-2).join(".");
	return `${protocol}//${domain}${port ? `:${port}` : ""}`;
});

const { execute: signIn } = useSignInApi();
const { execute: getTokens } = useGetTokens();
const error = ref("");
const onSubmit = async () => {
	if (!form.value) {
		return;
	}

	error.value = "";
	loading.value = true;

	try {
		await signIn(login.value, password.value);
		await getTokens(login.value);

		await navigateTo(rootUrl.value, { external: true });
	} catch (e) {
		console.error(e);
		error.value = e instanceof Error ? e.toString() : String(e);
	}

	loading.value = false;
};
</script>
