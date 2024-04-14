import {
	createRouter as _createRouter,
	createMemoryHistory,
	createWebHistory,
} from 'vue-router';
import {routes} from './routes';

/**
 * Shared client router between SPA & SSR
 */
export const createRouter = () => {
	// Different history for client and server
	// import.meta.env.SSR is injected by Vite
	const history = import.meta.env.SSR
		? createMemoryHistory()
		: createWebHistory();

	return _createRouter({
		history,
		routes: Object.values(routes),
	});
};
