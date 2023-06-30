<script>
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import './app.css';
	import { isSidebarExpanded } from './store.js';
</script>

<main class="flex h-screen flex-col overflow-auto">
	<Sidebar />

	<Header />
	<div class="flex-grow duration-300 {$isSidebarExpanded ? 'pl-48' : 'pl-16'}">
		<!-- Main content needs to account for header height and sidebar width. -->
		<slot />
	</div>
</main>
