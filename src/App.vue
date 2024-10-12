<style lang="scss" module>
.layout {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

<template>
	<BaseLayoutUi :class="$style.layout">
		<RouterView #default="{Component}">
			<Transition name="animation-fade" mode="out-in">
				<Component :is="Component" />
			</Transition>
		</RouterView>
	</BaseLayoutUi>
</template>

<script lang="ts" setup>
import {BaseLayoutUi} from 'common/fe/ui';
</script>
