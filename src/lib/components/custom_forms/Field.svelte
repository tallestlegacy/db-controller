<script lang="ts">
	import { type FieldType, Primitive as P } from '@/../types/cms';
	import { Input } from '@/components/ui/input';
	import Label from '@/components/ui/label/label.svelte';
	import { Textarea } from '@/components/ui/textarea';
	import { TriangleAlert } from 'lucide-svelte';

	let _type: FieldType = P.STRING;
	export { _type as type };

	export let value: string | number;
	export let label: string;
	export let placeholder: string | undefined = undefined;
	export let disabled: boolean = false;
	export let error: string | undefined = undefined;
</script>

<div class="grid gap-3">
	<Label>{label}</Label>

	<!-- {#if _type === Primitive.BOOLEAN}{/if} -->

	{#if _type === P.STRING}
		<Input type="text" bind:value {placeholder} {disabled} />
	{/if}

	{#if _type === P.TEXT}
		<Textarea bind:value {placeholder} {disabled} />
	{/if}

	{#if _type === P.NUMBER}
		<Input type="number" bind:value {disabled} />
	{/if}

	<!-- errors -->
	{#if error}
		<p class="flex items-center gap-2 text-sm font-bold italic text-destructive">
			<TriangleAlert size={16} />
			<span class="flex-1">
				{error}
			</span>
		</p>
	{/if}
</div>
