import { QueryClient } from '@sveltestack/svelte-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchOnMount: false
		}
	}
});
