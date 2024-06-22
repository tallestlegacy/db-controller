<script>
	import { FileSliders, FileText } from 'lucide-svelte';

	const routes = [
		{
			href: '/',
			name: 'Collections',
			icon: FileText,
		},
		{
			href: '/schemas',
			name: 'Schemas',
			icon: FileSliders,
		},
	];
</script>

<nav class="flex h-full min-w-fit flex-col gap-2 border-r bg-background p-2">
	{#each routes as { href, name, icon }}
		<a class="rounded-lg px-4 py-2" {href} title={name}>
			<svelte:component this={icon} />
		</a>
	{/each}
</nav>
