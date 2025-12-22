/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: "#163B6D",
				secondary: "#111827",
				tertiary: "#92949F",
				subtext: "#374151",
				appBg: "#D5DCF6",
				active: "#22C55E",
				pending: "#D7AE0B",
				expired: "#EF4444",
				info: "#213BBD"

			},
			fontFamily: {
				inter: ['Inter', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
