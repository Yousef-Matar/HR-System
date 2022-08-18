/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#060b23',
				primary: '#18ffff',
			},
		},
	},
	plugins: [],
}
