<style lang="scss" module>
.form {
	max-width: 320px;
	width: 100%;
}
</style>

<template>
	<div :class="$style.form">
		<div class="text-h4 pb-6 text-center">Restore account</div>
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
				<VBtn
					type="submit"
					variant="outlined"
					size="large"
					class="mt-2"
					block
					:disabled="!form"
					:loading="loading"
				>
					Restore
				</VBtn>
				<div v-if="error" class="mt-2 text-body-2 text-error">{{ error }}</div>
			</VForm>
			<div class="d-flex flex-column align-center mt-4 ga-1">
				<VBtn to="/signin" variant="text" size="small">Sign in</VBtn>
				<VBtn to="/signup" variant="text" size="small">Create account</VBtn>
			</div>
		</VCard>
	</div>
</template>

<script lang="ts" setup>
import { useRestoreApi } from "~/composables";

const form = ref(false);
const login = ref("");
const loading = ref(false);

const required = (v: string) => Boolean(v) || "Required field";

const { execute } = useRestoreApi();
const error = ref("");
const onSubmit = async () => {
	if (!form.value) {
		return;
	}

	error.value = "";
	loading.value = true;

	try {
		const response = await execute(login.value);
		console.log("response", response);
	} catch (e) {
		console.error(e);
		error.value = e instanceof Error ? e.toString() : String(e);
	}

	loading.value = false;
};
</script>
