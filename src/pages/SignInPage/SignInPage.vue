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
}

.title {
	margin-bottom: 32px;
	font-size: 32px;
}

.input {
	margin-bottom: 16px;
	width: 200px;
	padding: 8px;
	border: 1px solid black;
	border-radius: 2px;
	font: var(--font-default);
	cursor: text;
}

.submit {
	margin-bottom: 16px;
	width: 120px;
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
	font: var(--font-default);
	cursor: pointer;
	transition: text-decoration-color var(--transition-default-duration) linear;

	&:hover {
		text-decoration-color: transparent;
	}
}
</style>

<template>
	<form :class="$style.form" @submit="onSubmit">
		<HeadingUi type="h1" :class="$style.title">Sign In</HeadingUi>
		<input type="text" name="login" placeholder="Login" autocomplete="off" :class="$style.input">
		<input type="password" name="password" placeholder="Password" autocomplete="off" :class="$style.input">
		<button type="submit" :class="$style.submit">Sign in</button>
		<RouterLink :to="routes.signUp" :class="$style.link">Create account</RouterLink>
		<RouterLink :to="routes.restore" :class="$style.link">Restore account</RouterLink>
	</form>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {validateRequest, type ValidateRequestReq} from 'common/all/utils';
import {HeadingUi} from 'common/fe/ui';
import {signInReqSchema} from 'common/schemas';
import {routes} from '~/router';
import {AuthApi} from '~/api';

const rootPage = ref('');

onMounted(() => {
	if (import.meta.env.SSR) {
		return;
	}

	const {protocol, host} = location;
	const domain = host.split('.').slice(-2).join('.');

	rootPage.value = `${protocol}//${domain}`;
});

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
		const {body} = await validateRequest(data, signInReqSchema);

		if (await AuthApi.signIn(body) && await AuthApi.getTokens()) {
			location.replace(rootPage.value);
			return;
		}

		console.log('Oops, something went wrong');
	} catch (e) {
		console.log('Error is', e);
	}
};
</script>
