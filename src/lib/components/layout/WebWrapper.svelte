<script lang="ts">
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';
	import { queryClient } from '@/queries';
</script>

<ModeWatcher track />

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
