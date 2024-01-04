import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			precompress: true // Enables compression using gzip and brotli
		}),
		alias: {
			$types: 'src/app.d.ts',
			$components: 'src/components',
			$store: 'src/routes/store.ts'
		}
	},
	preprocess: [vitePreprocess({})]
};

export default config;
