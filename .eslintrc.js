/* eslint-disable no-undef */
module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'plugin:vue/recommended'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['vue'],
	rules: {
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: {
					max: 2
				}
			}
		],
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		'vue/no-v-html': 0
	}
}
