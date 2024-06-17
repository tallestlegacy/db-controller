<script lang="ts">
	import type { Field as SchemaField } from '@/../types/cms';
	import Field from '@/components/custom_forms/Field.svelte';
	import Select from '@/components/custom_forms/Select.svelte';
	import { Label } from '@/components/ui/label';
	import { FieldTypes } from '@/../types/cms_derived';
	import { Switch } from '@/components/ui/switch';

	interface Props {
		value: SchemaField;
	}

	let { value = $bindable() }: Props = $props();
</script>

<div class="flex flex-col gap-4 rounded-sm border p-4">
	<Field label="Field title" bind:value={value.title} placeholder="" />
	<Field label="Field name" bind:value={value.name} placeholder="" />
	<Field label="Field description" bind:value={value.description} type="TEXT" placeholder="" />
	<Label>Field type</Label>
	<Select options={FieldTypes} placeholder="FieldType" bind:value={value.type} />
	<div class="flex items-center gap-4">
		<span>Mark as identifier</span>
		<Switch bind:checked={value.isIdentifier} />
	</div>
</div>
