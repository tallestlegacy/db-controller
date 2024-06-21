<script lang="ts">
	import { CalendarIcon } from 'lucide-svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '@/components/ui/button';
	import { Calendar } from '@/components/ui/calendar';
	import * as Popover from '@/components/ui/popover';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long',
	});

	interface Props {
		disabled: boolean;
		value: Date | string | undefined;
	}

	let { disabled, value = $bindable() }: Props = $props();

	let className = '';
	export { className as class };

	let dateValue: DateValue | undefined = $state(undefined);

	$effect(function () {
		if (dateValue) {
			value = dateValue?.toDate(getLocalTimeZone());
		}
	});
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				'w-full justify-start text-left font-normal' + className,
				!value && 'text-muted-foreground',
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{dateValue ? df.format(dateValue?.toDate(getLocalTimeZone())) : 'Pick a date'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar bind:value={dateValue} {disabled} />
	</Popover.Content>
</Popover.Root>
