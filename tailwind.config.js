import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
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
			purple_highlight: '#4E40CA',
			white_warm: '#EEE7E7'
		},
		extend: {
			fontFamily: {
				inter: ['Inter Variable', 'sans-serif']
			}
		}
	},
	plugins: []
};
