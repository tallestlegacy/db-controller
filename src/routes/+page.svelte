<script lang="ts">
	import * as Card from '@/components/ui/card';
	import { FileSliders, FileText } from 'lucide-svelte';

	const actions = [
		{
			label: 'Schemas',
			href: '/schemas',
			icon: FileSliders,
		},
		{
			label: 'Collections',
			href: '/collections',
			icon: FileText,
		},
	];
</script>

<div class="flex flex-wrap gap-4 p-4">
	{#each actions as { label, href, icon }}
		<a {href}>
			<Card.Card class="flex items-center gap-4 p-12">
				<svelte:component this={icon} size="64" />
				<span>{label}</span>
			</Card.Card>
		</a>
	{/each}
</div>
