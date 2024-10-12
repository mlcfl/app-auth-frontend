<style lang="scss" module>
.form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 320px;
	height: 320px;
	padding: 16px;
	border: 1px solid black;
	border-radius: 2px;

	&_left {
		align-items: flex-start;
	}
}

.title {
	margin-bottom: 32px;
	font-size: 32px;
}

.checkbox {
	align-items: start;
	margin-bottom: 16px;
}

.submit {
	margin-bottom: 16px;
	width: 150px;
	padding: 8px;
	border: 1px solid black;
	border-radius: 2px;
	font: var(--font-default);
	background-color: transparent;
	cursor: pointer;
	transition: background-color var(--transition-default-duration) linear;

	&:hover {
		background-color: rgba(0 0 0 / 0.1);
	}

	&:active {
		background-color: transparent;
	}
}

.link {
	margin-top: 8px;
	align-self: center;
	font: var(--font-default);
	cursor: pointer;
	transition: text-decoration-color var(--transition-default-duration) linear;

	&:hover {
		text-decoration-color: transparent;
	}
}

.checkboxList {
	display: flex;
	flex-direction: column;
	width: 80%;
}

.text {
	font: var(--font-default);
}
</style>

<template>
	<form v-if="!readyToSignIn" :class="$style.form" @submit="onSubmit">
		<HeadingUi type="h1" :class="$style.title">Sign up</HeadingUi>
		<div :class="$style.checkboxList">
			<CheckboxUi name="rules" text="Service rules" :class="$style.checkbox" />
			<CheckboxUi name="cookie" text="Cookie" :class="$style.checkbox" />
			<CheckboxUi name="personal" text="Consent to the processing of personal data" :class="$style.checkbox" />
		</div>
		<button type="submit" :class="$style.submit">Create account</button>
		<RouterLink :to="routes.signIn" :class="$style.link">Sign in</RouterLink>
		<RouterLink :to="routes.restore" :class="$style.link">Restore account</RouterLink>
	</form>
	<div v-else :class="[$style.form, $style.form_left]">
		<div :class="$style.text">Your login and password are:</div>
		<div :class="$style.text">Login: {{login}}</div>
		<div :class="$style.text">Password: {{password}}</div>
		<RouterLink :to="routes.signIn" :class="$style.link">Sign in</RouterLink>
	</div>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';
import {
	validateRequest,
	validateResponse,
	type ValidateRequestReq,
} from 'common/all/utils';
import {HeadingUi, CheckboxUi} from 'common/fe/ui';
import {signUpReqSchema, signUpResSchema} from 'common/schemas';
import {routes} from '~/router';
import {AuthApi} from '~/api';

const login = ref<string>();
const password = ref<string>();
const readyToSignIn = computed(() => Boolean(login.value) && Boolean(password.value));

const onSubmit = async (e: Event) => {
	if (!(e.target instanceof HTMLFormElement)) {
		return;
	}

	e.preventDefault();

	const formData = new FormData(e.target);
	const data: ValidateRequestReq = {
		body: Object.fromEntries(formData.entries()),
	};

	try {
		const {body} = await validateRequest(data, signUpReqSchema);
		const res = await AuthApi.signUp(body);
		const validated = await validateResponse(res, signUpResSchema);

		login.value = validated.login;
		password.value = validated.password;
	} catch (e) {
		console.log('Error is', e);
	}
};
</script>
