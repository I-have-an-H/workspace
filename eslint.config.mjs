import common from 'eslint-config-neon/flat/common.js';
import node from 'eslint-config-neon/flat/node.js';
import prettier from 'eslint-config-neon/flat/prettier.js';
import typescript from 'eslint-config-neon/flat/typescript.js';
import merge from 'lodash.merge';
import tseslint from 'typescript-eslint';

const commonFiles = '{js,mjs,cjs,ts,mts,cts,jsx,tsx}';

const commonRuleset = merge(...common, { files: [`**/*${commonFiles}`] });

const nodeRuleset = merge(...node, { files: [`**/*${commonFiles}`] });

const typeScriptRuleset = merge(...typescript, {
	files: [`**/*${commonFiles}`],
	languageOptions: {
		parserOptions: {
			warnOnUnsupportedTypeScriptVersion: false,
			allowAutomaticSingleRunInference: true,
			project: ['tsconfig.eslint.json', 'submodules/*/tsconfig.eslint.json'],
		},
	},
	rules: {
		'@typescript-eslint/consistent-type-definitions': [2, 'interface'],
		'@typescript-eslint/naming-convention': [
			2,
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				custom: {
					regex: '^\\w{3,}',
					match: true,
				},
			},
		],
	},
	settings: {
		'import/resolver': {
			typescript: {
				project: ['tsconfig.eslint.json', 'submodules/*/tsconfig.eslint.json'],
			},
		},
	},
});

const prettierRuleset = merge(...prettier, { files: [`**/*${commonFiles}`] });

export default tseslint.config(
	{
		ignores: ['**/node_modules/', '.git/', '**/dist/', '**/coverage/'],
	},
	commonRuleset,
	nodeRuleset,
	typeScriptRuleset,
	{
		rules: {
			'@typescript-eslint/interface-name-prefix': 0,
			'@typescript-eslint/explicit-function-return-type': 0,
			'@typescript-eslint/explicit-module-boundary-types': 0,
			'@typescript-eslint/no-explicit-any': 0,
			'n/no-sync': 0,
		},
	},
	prettierRuleset,
);
