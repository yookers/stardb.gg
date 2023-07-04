<script>
	import { page } from '$app/stores';
    const apiURL = import.meta.env.VITE_API_URL;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="StarDB.gg - Home page" />
</svelte:head>

<div
	class="flex h-full flex-col items-center justify-center space-x-8 space-y-8 text-white_warm md:flex-row md:space-y-0"
>
	<p class="text-7xl md:text-9xl font-bold text-center">Hi there!</p>
	<img src="/images/march-happy.png" alt="" class="h-40 w-40" />
    
</div>
