<script lang="ts">
	import * as Select from '@/components/ui/select';

	type ValueType = string | number;

	interface Option {
		value: ValueType;
		label: string;
	}

	export let placeholder = '';
	export let options: Option[] = [];
	export let value: ValueType = '';
</script>

<Select.Root
	selected={options.find((e) => e.value == value)}
	onSelectedChange={(e) => (value = e?.value as ValueType)}
>
	<Select.Trigger class="w-full">
		<Select.Value {placeholder} />
	</Select.Trigger>
	<Select.Content>
		{#each options as { value, label }}
			<Select.Item {value}>{label}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
