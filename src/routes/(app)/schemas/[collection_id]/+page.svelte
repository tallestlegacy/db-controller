<script lang="ts">
	import { page } from '$app/stores';
	import type { Collection, Field as CMSField } from '@/../types/cms';
	import { FieldTypes } from '@/../types/cms_derived';
	import Field from '@/components/custom_forms/Field.svelte';
	import Select from '@/components/custom_forms/Select.svelte';
	import { Label } from '@/components/ui/label';
	import { Separator } from '@/components/ui/separator';
	import * as Accordion from '@/components/ui/accordion';
	import { Button } from '@/components/ui/button';
	import { Trash } from 'lucide-svelte';
	import { createSchema, updateSchema, getSchema, useGetAllSchemas } from '@/queries/schemas';
	import { goto } from '$app/navigation';
	import { useQueryClient } from '@sveltestack/svelte-query';

	const queryClient = useQueryClient();
	// const schemasQuery = useGetAllSchemas();

	// state

	let collectionID = $derived($page.params.collection_id);
	let isNew = $derived(collectionID === '$create');
	let loading = $state(false);

	const defaultField: CMSField = {
		title: '',
		name: '',
		description: '',
		type: 'STRING'
	};

	let form: Collection = $state({
		title: '',
		name: '',
		description: '',
		fields: []
	});

	let isButtonDisabled = $derived(loading || !form.name);
	let showing: string | undefined = $state('0');

	// functions

	function addField() {
		form.fields.push({ ...defaultField });
		showing = (form.fields.length - 1).toString();
	}

	function removeField(index: number) {
		form.fields.splice(index, 1);
		showing = undefined;
	}

	async function save() {
		try {
			loading = true;
			if (isNew) {
				const redirectID = await createSchema(form);
				queryClient.invalidateQueries('all-schemas');
				goto(`/schemas/${redirectID}`, { replaceState: true });
			} else {
				await updateSchema(collectionID, form);
			}
		} finally {
			loading = false;
		}
	}

	async function initPage() {
		const data = await getSchema(collectionID);
		delete data._id;
		form = { ...data };
	}

	$effect(function () {
		if (isNew === false) initPage();
	});
</script>

<div class="mx-auto flex h-full max-w-screen-md flex-col gap-2 px-4 py-16">
	<div class="flex flex-col gap-8">
		<Field
			label="Title"
			bind:value={form.title}
			type="STRING"
			placeholder="eg. Period blog posts"
		/>
		<Field
			label="Collection name"
			disabled={!isNew}
			bind:value={form.name}
			type="STRING"
			placeholder="eg. BlogPosts (no spaced or special characters)"
		/>
		<Field type="TEXT" bind:value={form.description} label="Description" placeholder="Optional" />
	</div>

	<h3 class="text-bold text-xl uppercase">Fields</h3>

	<Accordion.Root bind:value={showing}>
		{#each form.fields as _field, index}
			<Accordion.Item value={index.toString()}>
				<Accordion.AccordionTrigger>
					<div class="flex w-full items-center justify-between pe-4">
						<div>
							<span> {index + 1} </span> :
							<span>{_field.title ? _field.title : _field.name ? _field.name : 'Empty field'}</span>
						</div>
						<Button
							size="icon"
							variant="destructive"
							class="scale-[0.75]"
							on:click={() => removeField(index)}><Trash /></Button
						>
					</div>
				</Accordion.AccordionTrigger>
				<Accordion.AccordionContent class="p-4">
					<div class="flex flex-col gap-2">
						<Field label="Field title" bind:value={_field.title} placeholder="" />
						<Field label="Field name" bind:value={_field.name} placeholder="" />
						<Field
							label="Field description"
							bind:value={_field.description}
							type="TEXT"
							placeholder=""
						/>
						<Label>Field type</Label>
						<Select options={FieldTypes} placeholder="FieldType" bind:value={_field.type} />
					</div>
				</Accordion.AccordionContent>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
	<Button variant="outline" on:click={addField}>Add new field</Button>

	<Separator class="my-4" />
	<Button on:click={save} disabled={isButtonDisabled}>{isNew ? 'Create' : 'Update'}</Button>
</div>
