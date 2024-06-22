<script>
	import MainNavigationBar from '@/components/navigation/MainNavigationBar.svelte';
	import AppBar from './AppBar.svelte';
	import AppCommandMenu from './AppCommandMenu.svelte';
</script>

<AppCommandMenu />

<div class="grid h-screen grid-cols-[auto,1fr] overflow-hidden bg-muted dark:bg-muted/20">
	<MainNavigationBar />
	<div class="overflow-auto">
		<slot />
	</div>
</div>
