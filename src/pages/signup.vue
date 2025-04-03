<style lang="scss" module>
.form {
	max-width: 480px;
	width: 100%;
}
</style>

<template>
	<div v-if="!readyToSignIn" :class="$style.form">
		<div class="text-h4 pb-6 text-center">Sign Up</div>
		<VCard variant="outlined" class="px-6 py-8">
			<VForm v-model="form" @submit.prevent="createAccount">
				<VCheckbox
					v-model="checkboxes.rules"
					label="Service rules"
					density="compact"
					hide-details
					:rules="[required]"
				/>
				<VCheckbox
					v-model="checkboxes.cookie"
					label="Cookie"
					density="compact"
					hide-details
					:rules="[required]"
				/>
				<VCheckbox
					v-model="checkboxes.personal"
					label="Consent to the processing of personal data"
					density="compact"
					hide-details
					:rules="[required]"
				/>
				<VBtn
					type="submit"
					variant="outlined"
					size="large"
					class="mt-8"
					block
					:disabled="!form"
					:loading="loading"
				>
					Create account
				</VBtn>
				<div v-if="error" class="mt-2 text-body-2 text-error">{{ error }}</div>
			</VForm>
			<div class="d-flex flex-column align-center mt-4 ga-1">
				<VBtn to="/signin" variant="text" size="small">Sign in</VBtn>
				<VBtn to="/restore" variant="text" size="small">Restore account</VBtn>
			</div>
		</VCard>
	</div>
	<div v-else :class="$style.form">
		<div class="text-h4 pb-6 text-center">Sign In</div>
		<VCard variant="outlined" class="px-6 py-8">
			<VForm v-model="form" @submit.prevent="enterAccount">
				<div class="text-subtitle-1 mb-6">Your login and password are</div>
				<VTextField
					v-model="login"
					variant="outlined"
					class="mb-2"
					label="Login"
					autocomplete="off"
					readonly
				>
					<template #append-inner>
						<VTooltip
							location="top"
							:text="loginCopied ? 'Copied to clipboard' : 'Copy login'"
						>
							<template #activator="{ props }">
								<VIcon
									v-bind="props"
									icon="mdi-content-copy"
									@click="copy('login')"
								/>
							</template>
						</VTooltip>
					</template>
				</VTextField>
				<VTextField
					v-model="password"
					variant="outlined"
					class="mb-2"
					label="Password"
					autocomplete="off"
					readonly
				>
					<template #append-inner>
						<VTooltip
							location="top"
							:text="passwordCopied ? 'Copied to clipboard' : 'Copy password'"
						>
							<template #activator="{ props }">
								<VIcon
									v-bind="props"
									icon="mdi-content-copy"
									@click="copy('password')"
								/>
							</template>
						</VTooltip>
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
		</VCard>
	</div>
</template>

<script lang="ts" setup>
import { useGetTokens, useSignInApi, useSignUpApi } from "~/composables";

const form = ref(false);
const checkboxes = reactive({
	rules: false,
	cookie: false,
	personal: false,
});
const login = ref<string>("");
const password = ref<string>("");
const loading = ref(false);
const readyToSignIn = computed(
	() => Boolean(login.value) && Boolean(password.value)
);

const required = (v: string) => Boolean(v) || "Required field";

const { execute: signUp } = useSignUpApi();
const { execute: signIn } = useSignInApi();
const { execute: getTokens } = useGetTokens();
const router = useRouter();
const error = ref("");

const createAccount = async () => {
	if (!form.value) {
		return;
	}

	loading.value = true;

	try {
		const { login: loginV, password: passwordV } = await signUp(checkboxes);

		login.value = loginV;
		password.value = passwordV;
	} catch (e) {
		console.error(e);
		error.value = e instanceof Error ? e.toString() : String(e);
	}

	loading.value = false;
};

const url = useRequestURL();
const rootUrl = computed(() => {
	const { protocol, host } = url;
	const domain = host.split(".").slice(-2).join(".");

	return `${protocol}//${domain}`;
});

const enterAccount = async () => {
	if (!form.value) {
		return;
	}

	error.value = "";
	loading.value = true;

	try {
		const loginValue = login.value.replace(/-/g, "");
		await signIn(loginValue, password.value);
		await getTokens(loginValue);

		router.replace(rootUrl.value);
	} catch (e) {
		console.error(e);
		error.value = e instanceof Error ? e.toString() : String(e);
	}

	loading.value = false;
};

const loginCopied = ref(false);
const passwordCopied = ref(false);
const copy = async (type: "login" | "password") => {
	const isLogin = type === "login";
	const text = isLogin ? login.value : password.value;

	await navigator.clipboard.writeText(text);

	if (isLogin) {
		loginCopied.value = true;
	} else {
		passwordCopied.value = true;
	}

	setTimeout(() => {
		if (isLogin) {
			loginCopied.value = false;
		} else {
			passwordCopied.value = false;
		}
	}, 5000);
};
</script>
