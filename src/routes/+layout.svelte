<script>
	import 'iconify-icon';
	import AppShell from '@/components/layout/AppShell.svelte';
	import WebWrapper from '@/components/layout/WebWrapper.svelte';
	import '../app.css';
</script>

<WebWrapper>
	<AppShell>
		<slot></slot>
	</AppShell>
</WebWrapper>
