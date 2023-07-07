import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			space_dark: '#060D1C',
			space_light: '#0B1531',
			space_gray: '#3A4B75',
			white_warm: '#EEE7E7',
            warning_red: '#FF1E1E',
            success_green: '#30F51F',
			purple_highlight: '#4E40CA',
			neon_yellow: '#F5D300',
			neon_pink: '#FE53BB',
			neon_green: '#09F9D3',
			neon_blue: '#14D5FF',
			dim_purple: '#4E44A3',
			dim_yellow: '#C2A800',
			dim_pink: '#CC4395',
			dim_green: '#08C7AA',
			dim_blue: '#10AACC'
		},
		extend: {
			animation: {
				'spin-slow': 'spin 5s linear infinite'
			},
			fontFamily: {
				inter: ['Inter Variable', 'sans-serif']
			}
		}
	},
	plugins: []
};
