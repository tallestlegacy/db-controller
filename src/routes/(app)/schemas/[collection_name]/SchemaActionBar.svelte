<script>
	import { page } from '$app/stores';
	import { ArrowLeft, FilePlus, MoveLeft } from 'lucide-svelte';

	let isNew = $derived($page.params.collection_name === '$create');

	let title = $derived(isNew ? 'Create schema' : 'Edit schema');
</script>

<div class="sticky top-0 z-10 flex items-center justify-between gap-8 border-b bg-background p-4">
	<a href="/schemas">
		<ArrowLeft size={24} />
	</a>

	<h3 class="flex-1">
		{title}
	</h3>

	{#if !isNew}
		<a href="/collections/{$page.params.collection_name}/$create">
			<FilePlus />
		</a>
	{/if}
</div>
