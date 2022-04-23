/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { babel } from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json';

export default [
	{
		input: './src/index.ts',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: 'es',
				sourcemap: true,
				exports: 'named',
			},
		],
		plugins: [
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/preset-react'],
				plugins: ['babel-plugin-styled-components'],
			}),
			typescript({ useTsconfigDeclarationDir: true }),
			external(),
			resolve(),
			terser(),
			commonjs({
				ignoreGlobal: true,
				include: /\/node_modules\//,
				namedExports: {
					react: Object.keys(require('react')),
					'react-is': Object.keys(require('react-is')),
				},
			}),
			json(),
		],
		external: ['styled-components'],
	},
	{
		input: './dist/dts/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'es' }],
		plugins: [dts()],
	},
];
