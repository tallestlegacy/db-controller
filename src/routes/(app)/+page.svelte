<script>
	import { useGetAllCollections, createCollection } from '@/queries/collections';

	const collectionsQuery = useGetAllCollections();
</script>

<main class="p-4 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
	{#if $collectionsQuery.isLoading}
		<p>Loading ....</p>
	{/if}

	{#if $collectionsQuery.data}
		<pre>
    {JSON.stringify($collectionsQuery.data)}
  </pre>
	{/if}
</main>
