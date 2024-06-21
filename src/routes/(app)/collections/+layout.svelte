<script>
	import { page } from '$app/stores';
	import { useGetAllCollections } from '@/queries/collections';
	import { twMerge } from 'tailwind-merge';

	const collectionsQuery = useGetAllCollections();

	$: activeCollection = $page.params.collection_name;
</script>

<div class="flex">
	<nav class="flex h-screen w-fit flex-col gap-1 overflow-auto border-r p-2">
		<!-- Collections navigation bar -->
		{#each $collectionsQuery.data ?? [] as collectionName}
			<a
				href="/collections/{collectionName}/"
				class={twMerge(
					'rounded-sm border border-b-2 border-transparent bg-inherit px-4 py-2',
					activeCollection === collectionName ? 'border-border bg-background text-primary' : '',
				)}
			>
				{collectionName}
			</a>
		{/each}
	</nav>
	<div class="flex-1">
		{#key $page}
			<slot />
		{/key}
	</div>
</div>
