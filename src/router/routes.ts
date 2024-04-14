import type {RouteRecordRaw} from 'vue-router';

export enum Routes {
	Root = 'root',
	SignIn = 'signIn',
	SignUp = 'signUp',
	Restore = 'restore',
}

export const routes: Record<Routes, RouteRecordRaw> = {
	[Routes.Root]: {
		name: Routes.Root,
		path: '/',
		redirect: '/signin',
	},
	[Routes.SignIn]: {
		name: Routes.SignIn,
		path: '/signin',
		component: () => import('../pages/SignInPage/SignInPage.vue'),
	},
	[Routes.SignUp]: {
		name: Routes.SignUp,
		path: '/signup',
		component: () => import('../pages/SignUpPage/SignUpPage.vue'),
	},
	[Routes.Restore]: {
		name: Routes.Restore,
		path: '/restore',
		component: () => import('../pages/RestorePage/RestorePage.vue'),
	},
};
