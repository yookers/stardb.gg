import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { join } from 'path';
import fs from 'fs';
import { partytownVite } from '@builder.io/partytown/utils';

export default defineConfig({
	plugins: [
		sveltekit(),
		partytownVite({
			// `dest` specifies where files are copied to in production
			dest: join(process.cwd(), '.svelte-kit/output/client/~partytown')
		})
	],
	ssr: {
		noExternal: ['svelte-hero-icons']
	},
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/cert/key.pem`),
			cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
		},
		proxy: {
			'/api': 'https://stardb.gg'
		}
	}
});
