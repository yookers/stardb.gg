<script>
	import Sidebar from './Sidebar.svelte';
	import './app.css';
</script>

<main class="bg-space_dark">
	<div class="flex">
		<Sidebar />
		<slot />
	</div>
</main>
