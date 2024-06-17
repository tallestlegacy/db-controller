<script>
	import * as Card from '@/components/ui/card';
	import * as Ctx from '@/components/ui/context-menu';
	import { Edit, FilePlus, PackagePlus } from 'lucide-svelte';
	import { useGetAllSchemas } from '@/queries/schemas';
	import { Skeleton } from '@/components/ui/skeleton';
	import { Badge } from '@/components/ui/badge';
	import { goto } from '$app/navigation';

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
			<Ctx.Root>
				<Ctx.Trigger>
					<a href="/schemas/{schema.name}">
						<Card.Card class="relative z-0 flex h-full min-h-[200px] flex-col gap-4 p-4">
							<Badge class="w-fit text-sm">{schema.name}</Badge>
							<span class="text-xl">{schema.title}</span>
							<p class="line-clamp-3 text-xs">{schema.description}</p>
						</Card.Card>
					</a>
				</Ctx.Trigger>
				<Ctx.Content>
					<Ctx.Item onclick={() => goto(`/schemas/${schema.name}`)}>
						<span>Edit schema</span>
					</Ctx.Item>
					<Ctx.Separator />
					<Ctx.Item onclick={() => goto(`/collections/${schema.name}/$create`)}>
						<span>Create document</span>
					</Ctx.Item>
					<Ctx.Item onclick={() => goto(`/collections/${schema.name}`)}>
						<span>View all documents</span>
					</Ctx.Item>
				</Ctx.Content>
			</Ctx.Root>
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
