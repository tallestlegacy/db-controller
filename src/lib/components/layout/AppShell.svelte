<script>
	import MainNavigationBar from '@/components/navigation/MainNavigationBar.svelte';
	import AppBar from './AppBar.svelte';
</script>

<div class="grid h-screen grid-rows-[auto,1fr] bg-background">
	<AppBar />
	<div class="grid h-full grid-cols-[auto,1fr] overflow-hidden bg-muted dark:bg-muted/20">
		<MainNavigationBar />
		<div class="overflow-auto">
			<slot />
		</div>
	</div>
</div>
