<script>
	import * as Card from '@/components/ui/card';
	import { useGetAllDocuments } from '@/queries/collections';
	import { page } from '$app/stores';
	import { FilePlus } from 'lucide-svelte';
	import { Skeleton } from '@/components/ui/skeleton';
	import { useGetSchema } from '@/queries/schemas';

	// @ts-ignore
	const collection_name = $page.params.collection_name;
	const query = useGetAllDocuments(collection_name);
	const schemaQuery = useGetSchema(collection_name);
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4">
	<!-- create new document -->
	<a href="/collections/{collection_name}/$create">
		<Card.Card
			class="flex min-h-[200px] cursor-pointer transition-all duration-300 hover:-translate-y-1"
		>
			<div class="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-muted-foreground">
				<FilePlus size="64" />
				<p class="text-sm font-bold uppercase">New document</p>
			</div>
		</Card.Card>
	</a>

	{#each $query.data || [] as doc}
		<a href="/collections/{collection_name}/{doc._id}">
			<Card.Card class="h-full">
				<div class="text-md grid gap-x-4 gap-y-2 overflow-hidden text-ellipsis p-4 text-sm">
					<span class="overflow-hidden text-ellipsis text-xs text-muted-foreground">
						id : {doc._id}
					</span>
					{#if $schemaQuery.data}
						{#each $schemaQuery.data.fields.filter((e) => e.isIdentifier) as id}
							<span class="overflow-hidden text-ellipsis text-xs text-muted-foreground">
								{id.name}
							</span>
							<span class="overflow-hidden text-ellipsis font-semibold">
								{doc.data[id.name]}
							</span>
						{/each}
					{/if}
				</div>
			</Card.Card>
		</a>
	{/each}

	{#if $query.isLoading}
		{#each Array.from({ length: 3 }) as _}
			<Card.Card class="flex min-h-[200px] flex-col gap-4 p-4">
				<Skeleton class="h-6 w-24" />
				<Skeleton class="h-6 w-full" />
			</Card.Card>
		{/each}
	{/if}
</div>
