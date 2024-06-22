<script lang="ts">
	import * as Card from '@/components/ui/card';
	import { ClipboardList, FileStack } from 'lucide-svelte';

	const actions = [
		{
			label: 'Collections',
			href: '/collections',
			icon: FileStack,
		},
		{
			label: 'Schemas',
			href: '/schemas',
			icon: ClipboardList,
		},
	];
</script>

<div class="flex flex-wrap gap-4 p-4">
	{#each actions as { label, href, icon }}
		<a {href}>
			<Card.Card class="flex items-center gap-4 p-12 text-muted-foreground shadow-none">
				<svelte:component this={icon} size="64" class="" />
				<span class="font-bold uppercase">{label}</span>
			</Card.Card>
		</a>
	{/each}
</div>
