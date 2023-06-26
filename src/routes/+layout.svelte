<script>
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import './app.css';
</script>

<main class="flex flex-col bg-space_dark">
	<Header />

	<div class="flex">
		<Sidebar />
		<slot />
	</div>
</main>
