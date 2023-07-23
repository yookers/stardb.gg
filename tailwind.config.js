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
			space_dark: '#0F0A1F',
			space_light: '#0B1531',
			space_gray: '#3A4B75',
			off_white: '#DCDEFC',
			warning_red: '#FF1E1E',
			success_green: '#30F51F',
			purple_highlight: '#4E40CA',
			neon_yellow: '#F5D300',
			neon_pink: '#FE53BB',
			neon_green: '#09F9D3',
			neon_blue: '#14C7FF',
			dim_purple: '#4E44A3',
			dim_yellow: '#C2A800',
			dim_pink: '#CC4395',
			dim_green: '#08C7AA',
			dim_blue: '#10AACC',
            galaxy_purple: {
                '50': '#EDEFFE',
                '100': '#DCDEFC',
                '150': '#CACEF9',
                '200': '#BABDF7',
                '250': '#A9ADF3',
                '300': '#9A9CF0',
                '350': '#8B8BEC',
                '400': '#7C79E8',
                '450': '#6F67E3',
                '500': '#6254DE',
                '550': '#5448C1',
                '600': '#473CA5',
                '650': '#3A3189',
                '700': '#2D266F',
                '750': '#211B55',
                '800': '#16113D',
                '850': '#0B0826',
                '900': '#030212',
                '950': '#000002',
            }
		}, 
		extend: {
			animation: {
				'spin-slow': 'spin 10s linear infinite'
			},
			fontFamily: {
				inter: ['Inter Variable', 'sans-serif'],
                dm_sans: ['DM Sans', 'sans-serif'],
			}
		}
	},
	plugins: []
};
