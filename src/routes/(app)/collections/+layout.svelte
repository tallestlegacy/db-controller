<script lang="ts">
	import { page } from '$app/stores';
	import { Separator } from '@/components/ui/separator';
	import { useGetAllCollections } from '@/queries/collections';
	import { useGetAllSchemas } from '@/queries/schemas';
	import { twMerge } from 'tailwind-merge';

	const collectionsQuery = useGetAllCollections();
	const schemaQuery = useGetAllSchemas();

	$: activeCollection = $page.params.collection_name;

	function getSchema(collectionName: string) {
		if (!$schemaQuery.data) return null;
		return $schemaQuery.data.find((e: any) => e.name === collectionName);
	}
</script>

<div class="flex">
	<nav class="flex h-screen w-fit min-w-[240px] flex-col gap-1 overflow-auto border-r p-2">
		<!-- Collections navigation bar -->
		{#each $collectionsQuery.data ?? [] as collectionName, index}
			<a
				href="/collections/{collectionName}/"
				class={twMerge(
					'flex flex-col rounded-sm border border-dashed border-transparent bg-inherit px-4 py-2 transition-all duration-200',
					activeCollection === collectionName
						? '  border-primary/50 text-primary'
						: 'hover:bg-muted',
				)}
			>
				{#if getSchema(collectionName)}
					<span class="font-semibold">
						{getSchema(collectionName).title}
					</span>
					<span class="text-xs">{collectionName}</span>
				{:else}
					{collectionName}
				{/if}
			</a>
			{#if $collectionsQuery.data.length - 1 !== index}
				<Separator />
			{/if}
		{/each}
	</nav>
	<div class="flex-1">
		{#key $page}
			<slot />
		{/key}
	</div>
</div>
