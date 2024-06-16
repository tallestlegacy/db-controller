<script>
	import * as Card from '@/components/ui/card';
	import { Edit, FilePlus, PackagePlus } from 'lucide-svelte';
	import { useGetAllSchemas } from '@/queries/schemas';
	import { Skeleton } from '@/components/ui/skeleton';
	import { Badge } from '@/components/ui/badge';

	const query = useGetAllSchemas();
</script>

<main class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4">
	<a href="/schemas/$create">
		<Card.Card
			class="flex min-h-[200px] cursor-pointer transition-all duration-300 hover:-translate-y-1"
		>
			<div class="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-muted-foreground">
				<PackagePlus size="64" />
				<p class="text-sm font-bold uppercase">New schema</p>
			</div>
		</Card.Card>
	</a>

	{#if $query.data}
		{#each $query.data as schema}
			<Card.Card class="relative z-0 flex h-full min-h-[200px] flex-col gap-4 p-4">
				<Badge class="w-fit text-sm">{schema.name}</Badge>
				<span class="text-xl">{schema.title}</span>
				<p class="line-clamp-3 text-xs">{schema.description}</p>

				<div
					class="absolute inset-0 z-10 flex rounded-[inherit] bg-background/90 opacity-0 transition-all hover:opacity-100"
				>
					<a
						href="/schemas/{schema._id}"
						class="flex flex-1 items-center justify-center text-foreground/50 transition-all hover:text-foreground"
					>
						<Edit class="color" />
					</a>
					<div class="w-px bg-border"></div>
					<a
						href="/collections/{schema.name}/$create"
						class="flex flex-1 items-center justify-center text-foreground/50 transition-all hover:text-foreground"
					>
						<FilePlus />
					</a>
				</div>
			</Card.Card>
		{/each}
	{/if}

	{#if $query.isLoading}
		{#each Array.from({ length: 3 }) as _}
			<Card.Card class="flex min-h-[200px] flex-col gap-4 p-4">
				<Skeleton class="h-6 w-24" />
				<Skeleton class="h-6 w-full" />
			</Card.Card>
		{/each}
	{/if}
</main>
