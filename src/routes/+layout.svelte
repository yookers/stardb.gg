<script>
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import './app.css';
	import { isSidebarExpanded, mobileSidebarToggle } from './store.js';
</script>

<main class="flex h-screen flex-col">
	<Sidebar />
	<div
		class="flex-grow pt-16 duration-300 {$isSidebarExpanded ? 'md:pl-48' : 'md:pl-16'}"
		on:touchstart={() => mobileSidebarToggle && mobileSidebarToggle.set(false)}
	>
		<Header />
		<!-- Main content needs to account for header height and sidebar width. -->
		<slot />
	</div>
</main>
