<script lang="ts">
	import { page } from '$app/stores';
	import Field from '@/components/custom_forms/Field.svelte';
	import type { Field as SchemaField } from '@/../types/cms';

	import {
		createDocument,
		deleteDocument,
		updateDocument,
		useGetSingleDocument
	} from '@/queries/collections';
	import { useGetSchema } from '@/queries/schemas';
	import { Button } from '@/components/ui/button';
	import { goto } from '$app/navigation';
	import { queryClient } from '@/queries';

	let { document_id, collection_name } = $page.params;
	let isNew = document_id === '$create';

	const schemaQuery = useGetSchema(collection_name);
	const docQuery = useGetSingleDocument(collection_name, document_id);

	let isSaving = $state(false);
	let form = $state({});
	let isInitialised = $state(false);

	schemaQuery.subscribe(({ data }) => {
		if (!isInitialised && data && data.fields && isNew) {
			form = { ...form, ...getInitialFormValues(data.fields) };
			isInitialised = true;
		}
	});

	docQuery.subscribe(({ data }) => {
		if (!isInitialised && data && !isNew) {
			form = { ...form, ...data.data };
			isInitialised = true;
		}
	});

	function getInitialFormValues(fields: SchemaField[]) {
		let data: any = {};
		for (const _field of fields) {
			let value = (function () {
				switch (_field.type) {
					case 'BOOLEAN':
						return false;
					case 'NUMBER':
						return 0;
					case 'DATE':
						return '';
					case 'STRING':
					case 'TEXT':
					default:
						return '';
				}
			})();
			if (_field.name !== '') data[_field.name] = value;
		}
		return data;
	}

	async function save() {
		try {
			isSaving = true;
			if (isNew) {
				const _id = await createDocument(collection_name, form);
				goto(`/collections/${collection_name}/${_id}`, { replaceState: true });
				queryClient.invalidateQueries(['all-documents', collection_name]);
			} else {
				await updateDocument(collection_name, document_id, form);
			}
		} finally {
			isSaving = false;
		}
	}

	async function deleteDoc() {
		await deleteDocument(collection_name, collection_name);
		goto(`/collections/${collection_name}`);
		queryClient.invalidateQueries(['all-documents', collection_name]);
	}
</script>

<div class="flex w-full max-w-screen-md flex-col gap-4 p-4">
	{#if $schemaQuery.data && $schemaQuery.data.fields}
		{#each $schemaQuery.data.fields as _field}
			{#if _field.name.toString()}
				<Field
					label={_field.title ?? ''}
					placeholder={_field.title}
					bind:value={form[_field.name]}
					type={_field.type}
				/>
			{/if}
		{/each}

		<Button on:click={save} disabled={isSaving}>{isNew ? 'Create' : 'Update'}</Button>
		{#if !isNew}
			<Button on:click={deleteDoc} variant="destructive">Delete</Button>
		{/if}
	{/if}
</div>
