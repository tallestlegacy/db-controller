<script lang="ts">
	import Calculator from 'lucide-svelte/icons/calculator';
	import Calendar from 'lucide-svelte/icons/calendar';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import Settings from 'lucide-svelte/icons/settings';
	import Smile from 'lucide-svelte/icons/smile';
	import User from 'lucide-svelte/icons/user';
	import { onMount } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import { toggleMode } from 'mode-watcher';

	let open = $state(false);

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		}

		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item onSelect={toggleMode}>
				<Calculator class="mr-2 h-4 w-4" />
				<span>Toggle mode (dark/light)</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
