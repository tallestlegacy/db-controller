<script lang="ts">
	import { page } from '$app/stores';
	import { ClipboardList, FileStack, LayoutDashboard } from 'lucide-svelte';

	const routes = [
		{
			href: '/',
			name: 'Dash',
			icon: LayoutDashboard,
		},
		{
			href: '/collections',
			name: 'Collections',
			icon: FileStack,
		},
		{
			href: '/schemas',
			name: 'Schemas',
			icon: ClipboardList,
		},
	];

	function isActive(route: string) {
		// if (route === $page.url.pathname) return true;

		if (route === '/') return $page.url.pathname === '/';

		return $page.url.pathname.startsWith(route);
	}
</script>

<nav class="flex h-full min-w-fit flex-col gap-2 border-r bg-background p-2">
	{#each routes as { href, name, icon }}
		<a
			class="flex aspect-square items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200 {isActive(
				href,
			)
				? 'bg-foreground text-background'
				: 'bg-transparent text-foreground hover:bg-muted'}"
			{href}
			title={name}
		>
			<svelte:component this={icon} />
			<!-- <span> {name} </span> -->
		</a>
	{/each}
</nav>
