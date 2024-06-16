<script>
	const routes = [
		{
			href: '/',
			name: 'Collections'
		},
		{
			href: '/schemas',
			name: 'Schemas'
		}
	];
</script>

<nav class="flex h-full w-[240px] min-w-fit flex-col gap-2 border-r bg-background p-2">
	{#each routes as { href, name }}
		<a class="rounded-lg border px-4 py-2" {href}> {name} </a>
	{/each}
</nav>
