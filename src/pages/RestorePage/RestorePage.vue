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
	line-height: 1;
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
		<HeadingUi type="h1" :class="$style.title">Restore account</HeadingUi>
		<input type="text" name="login" placeholder="Login" autocomplete="off" :class="$style.input">
		<button type="submit" :class="$style.submit">Restore</button>
		<RouterLink :to="routes.signIn" :class="$style.link">Sign in</RouterLink>
		<RouterLink :to="routes.signUp" :class="$style.link">Create account</RouterLink>
	</form>
</template>

<script lang="ts" setup>
import {validateRequest, type ValidateRequestReq} from 'common/all/utils';
import {HeadingUi} from 'common/fe/ui';
import {restoreReqSchema} from 'common/schemas';
import {routes} from '~/router';
import {AuthApi} from '~/api';

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
		const {body} = await validateRequest(data, restoreReqSchema);

		await AuthApi.restore(body);
	} catch (e) {
		console.log('Error is', e);
	}
};
</script>
