<script lang="ts">
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';
	import { queryClient } from '@/queries';
	import { Toaster } from '@/components/ui/sonner';
</script>

<ModeWatcher />
<Toaster richColors position="top-right" />

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
