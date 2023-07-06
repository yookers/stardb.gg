import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { join } from 'path';
import { partytownVite } from '@builder.io/partytown/utils';

export default defineConfig({
	plugins: [
		sveltekit(),
		partytownVite({
			// `dest` specifies where files are copied to in production
			dest: join(process.cwd(), 'static', '~partytown')
		})
	],
	ssr: {
		noExternal: ['svelte-hero-icons']
	},
	server: {
		proxy: {
			'/api': 'https://stardb.gg',
			'/gtm.js': 'https://www.googletagmanager.com'
		}
	}
});
