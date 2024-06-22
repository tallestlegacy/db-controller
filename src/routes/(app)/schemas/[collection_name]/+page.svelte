<script lang="ts">
	import { page } from '$app/stores';
	import type { Collection, Field as CMSField } from '@/../types/cms';
	import Field from '@/components/custom_forms/Field.svelte';
	import { Separator } from '@/components/ui/separator';
	import * as Accordion from '@/components/ui/accordion';
	import { Button } from '@/components/ui/button';
	import { Trash } from 'lucide-svelte';
	import { createSchema, updateSchema, getSchema, useGetAllSchemas } from '@/queries/schemas';
	import { goto } from '$app/navigation';
	import { useQueryClient } from '@sveltestack/svelte-query';
	import SchemaField from '../components/SchemaField.svelte';
	import SchemaActionBar from './SchemaActionBar.svelte';

	const queryClient = useQueryClient();
	// const schemasQuery = useGetAllSchemas();

	// state

	let collectionIdentifier = $derived($page.params.collection_name);
	let isNew = $derived(collectionIdentifier === '$create');
	let loading = $state(false);

	const defaultField: CMSField = {
		title: '',
		name: '',
		description: '',
		type: 'STRING',
		isIdentifier: false,
	};

	let form: Collection = $state({
		title: '',
		name: '',
		description: '',
		fields: [],
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
				goto(`/schemas/${form.name}`, { replaceState: true });
			} else {
				await updateSchema(collectionIdentifier, form);
			}
		} finally {
			loading = false;
		}
	}

	async function initPage() {
		const data = await getSchema(collectionIdentifier);
		delete data._id;
		form = { ...data };
	}

	$effect(function () {
		if (isNew === false) initPage();
	});
</script>

<div class="h-screen overflow-auto border-r">
	<SchemaActionBar />

	<div class=" flex flex-col gap-8 px-4 py-16">
		<section class="mx-auto flex w-full max-w-screen-md flex-col gap-8">
			<h3 class="text-xl font-bold uppercase text-muted-foreground">Schema info</h3>

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
				<Field
					type="TEXT"
					bind:value={form.description}
					label="Description"
					placeholder="Optional"
				/>
			</div>
		</section>

		<Separator />

		<section class="mx-auto flex w-full max-w-screen-md flex-col gap-8">
			<h3 class="text-xl font-bold uppercase text-muted-foreground">Fields</h3>

			<Accordion.Root bind:value={showing}>
				{#each form.fields as _field, index}
					<Accordion.Item value={index.toString()}>
						<Accordion.AccordionTrigger>
							<div class="flex w-full items-center justify-between pe-4">
								<div class="font-bold {_field?.isIdentifier ? 'text-primary' : ''}">
									<span> {index + 1} </span> :
									<span
										>{_field.title ? _field.title : _field.name ? _field.name : 'Empty field'}</span
									>
								</div>
								<Button
									size="icon"
									variant="destructive"
									class="scale-[0.75]"
									on:click={() => removeField(index)}><Trash /></Button
								>
							</div>
						</Accordion.AccordionTrigger>
						<Accordion.AccordionContent>
							<SchemaField bind:value={form.fields[index]} />
						</Accordion.AccordionContent>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
			<Button variant="outline" on:click={addField}>Add new field</Button>
		</section>

		<Separator />

		<section class="mx-auto flex w-full max-w-screen-md flex-col gap-8">
			<Button on:click={save} disabled={isButtonDisabled} class="flex-1">
				{isNew ? 'Create' : 'Update'}
			</Button>
		</section>
	</div>
</div>
