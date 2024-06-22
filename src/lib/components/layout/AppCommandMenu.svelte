<script lang="ts">
	import { onMount } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import { toggleMode } from 'mode-watcher';
	import { ClipboardList, ClipboardPlus, FileStack, SunMoon } from 'lucide-svelte';
	import { goto } from '$app/navigation';

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

	function navigate(arg: string) {
		return () => {
			open = false;
			goto(arg);
		};
	}
</script>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<!-- actions -->
		<Command.Group heading="App actions">
			<Command.Item onSelect={navigate('/collections')}>
				<FileStack class="mr-2 h-4 w-4" />
				<span>View all collections</span>
			</Command.Item>
			<Command.Item onSelect={navigate('/schemas')}>
				<ClipboardList class="mr-2 h-4 w-4" />
				<span>View all schemas</span>
			</Command.Item>
			<Command.Item onSelect={navigate('/schemas/$create')}>
				<ClipboardPlus class="mr-2 h-4 w-4" />
				<span>View all schemas</span>
				<span>Create a new schema</span>
			</Command.Item>
		</Command.Group>

		<Command.Separator />

		<!-- app settings -->
		<Command.Group heading="Settings">
			<Command.Item onSelect={toggleMode}>
				<SunMoon class="mr-2 h-4 w-4" />
				<span>Toggle mode (dark/light)</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
