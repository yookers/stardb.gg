<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from '$store';
	import Logo from './Logo.svelte';
	import { Icon, User } from 'svelte-hero-icons';
	import { Menu, LogIn, LogOut, Settings, ArrowRight, Globe } from 'lucide-svelte';
	import { sidebarState } from '$store';
	import { SidebarState } from '$types';
	import { goto } from '$app/navigation';
	import languages from '$lib/languages.json';
	import { replaceLocaleInUrl } from '$lib/utils';
	import translations from '$lib/translations/translations';
	const PUBLIC_SERVER_API_URL = import.meta.env.VITE_PUBLIC_SERVER_API_URL;

	const lang = $locale as 'de' | 'en' | 'es' | 'fr' | 'id' | 'jp' | 'kr' | 'pt' | 'ru' | 'th' | 'vi' | 'chs' | 'cht';
	let isLanguageDropdownOpen = false;

	function toggleSidebar() {
		if ($sidebarState === SidebarState.CLOSED || $sidebarState === SidebarState.COLLAPSED) {
			sidebarState.set(SidebarState.EXPANDED);
		} else {
			sidebarState.set(SidebarState.CLOSED);
		}
	}

	async function logOut() {
		try {
			const res = await fetch(`${PUBLIC_SERVER_API_URL}/users/auth/logout`, { method: 'POST' });
			if (res.ok) {
				goto(`/${$locale}/`, { invalidateAll: true });
			} else {
				goto(`/${$locale}/logout`);
			}
		} catch (error) {
			goto(`/${$locale}/logout`);
		}
	}

	const handleDropdownFocusLoss = (event: FocusEvent) => {
		const relatedTarget = event.relatedTarget as HTMLElement | null;
		const currentTarget = event.currentTarget as HTMLElement;

		if (relatedTarget && currentTarget.contains(relatedTarget)) return;
		isLanguageDropdownOpen = false;
	};

	function changeLanguage(newLocale: string) {
		document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
		isLanguageDropdownOpen = false;
		locale.set(newLocale);
		const newURL = replaceLocaleInUrl($page.url, newLocale);
		goto(newURL, { replaceState: true, noScroll: true });
	}

	$: accountUsername = $page.data.user?.username;
</script>

<header
	class="fixed left-0 top-0 z-10 flex h-16 w-full items-center justify-between gap-x-3 border-b-2 border-galaxy_purple-750 bg-space_dark duration-300 hover:border-galaxy_purple-650"
>
	<div class="flex items-center">
		<button
			class="ml-4 flex h-8 w-8 items-center justify-center rounded-lg text-off_white hover:translate-y-0.5 hover:text-galaxy_purple-250 md:hidden"
			aria-label="Toggle sidebar"
			on:click={toggleSidebar}
		>
			<Menu class="h-6 w-6" />
		</button>
		<a
			href="/{$locale}"
			aria-label="StarDB.GG Home page"
			class="ml-3 flex items-center space-x-1.5 stroke-off_white text-off_white hover:translate-y-0.5 hover:stroke-galaxy_purple-250 hover:text-galaxy_purple-250 md:pl-5"
		>
			<Logo class="w-5 overflow-visible fill-off_white stroke-[7]" />
			<p class="hidden font-dm_sans text-2xl tracking-tighter md:block">stardb.gg</p>
		</a>
	</div>

	<div class="flex items-center pr-4">
		<!-- Discord invite link -->
		<a
			href="https://discord.gg/chives"
			aria-label="Discord invite link"
			target="_blank"
			rel="noopener noreferrer"
			class="mr-4 flex h-8 w-8 items-center justify-center"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 127.14 96.36"
				class="h-6 w-6 fill-off_white hover:translate-y-0.5 hover:fill-galaxy_purple-250 md:h-7 md:w-7"
			>
				<path
					d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
				/>
			</svg>
		</a>

		<!-- Change language -->
		<div class="static flex sm:relative" on:focusout={handleDropdownFocusLoss}>
			<button aria-label="Change language" on:click={() => (isLanguageDropdownOpen = !isLanguageDropdownOpen)}>
				<Globe class="mr-4 h-6 w-6 text-off_white hover:translate-y-0.5 hover:text-galaxy_purple-250 md:h-7 md:w-7" />
			</button>
			{#if isLanguageDropdownOpen}
				<div
					class="absolute left-0 top-16 flex w-full flex-col overflow-hidden border-b-2 border-galaxy_purple-550 bg-galaxy_purple-650 text-off_white sm:-left-12 sm:top-[38px] sm:w-auto sm:rounded-xl sm:border-2"
				>
					{#each languages as language}
						<button
							class="w-full py-1.5 pl-3 pr-8 hover:bg-galaxy_purple-200 hover:text-galaxy_purple-750 sm:py-1 {$locale ===
							language.id
								? 'bg-galaxy_purple-200 text-galaxy_purple-750'
								: ''}"
							on:click={() => changeLanguage(language.id)}
						>
							<p class="text-left font-semibold">{language.name}</p>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Login/Account -->
		<div
			class="group relative flex h-8 max-w-[120px] justify-center rounded-lg border-transparent bg-galaxy_purple-550 text-off_white sm:max-w-[192px]"
		>
			{#if accountUsername}
				<div class="flex items-center space-x-2 overflow-x-hidden px-3">
					<Icon src={User} solid class="h-4 w-4 shrink-0" />
					<p class=" select-none truncate text-sm font-bold">{accountUsername}</p>
				</div>
			{:else}
				<a
					href="/{$locale}/login"
					class="flex items-center space-x-2 rounded-lg px-3 hover:bg-galaxy_purple-200 hover:text-galaxy_purple-750"
					aria-label="Login page"
					tabindex="0"
				>
					<LogIn class="h-4 w-4 " />
					<p class="text-sm font-bold">{translations[lang].login}</p>
				</a>
			{/if}

			{#if accountUsername}
				<div
					class="absolute right-0 top-8 hidden w-48 pt-2 group-focus-within:flex group-focus-within:flex-col group-hover:flex group-hover:flex-col"
				>
					<div class="overflow-hidden rounded-lg border-2 border-galaxy_purple-450 bg-galaxy_purple-550 text-sm font-bold">
						<a
							href="/{$locale}/account"
							class="flex w-full items-center justify-between px-3 py-3 hover:bg-galaxy_purple-200 hover:text-galaxy_purple-750"
						>
							<div class="flex items-center space-x-2">
								<Settings class="h-4 w-4 " />
								<p>{translations[lang].account}</p>
							</div>
							<ArrowRight class="h-4 w-4 " />
						</a>
						<button
							class="flex w-full items-center justify-between px-3 py-3 hover:bg-galaxy_purple-200 hover:text-galaxy_purple-750"
							on:click={logOut}
						>
							<div class="flex items-center space-x-2">
								<LogOut class="h-4 w-4 " />
								<p>{translations[lang].logout}</p>
							</div>
							<ArrowRight class="h-4 w-4 " />
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</header>
