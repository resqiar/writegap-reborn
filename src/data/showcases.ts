import {
	fastify,
	jdoodle,
	nestjs,
	passport,
	postgres,
	svelte,
	tailwind,
	typeorm,
	typescript
} from './stack';

export const showcaseData = [
	{
		title: 'Algo Visualizer',
		description: 'Visualize infamous many algorithms for showcase and learning purpose.',
		images: ['/media/algo.png', '/media/algo-1.png', '/media/algo-2.png', '/media/algo-3.png'],
		demoURL: 'https://resqiar.github.io/algo-visualization',
		sourceURL: 'https://github.com/resqiar/algo-visualization',
		techs: [svelte, typescript]
	},
	{
		title: 'Binder',
		description:
			'My personal binder extensions. Used to store additional data to organize my binder books. With Image, Code, Playground, and QR Code functionalities, effortlessly store and organize additional data within your binder books.',
		images: [
			'/media/binder.png',
			'/media/binder-1.png',
			'/media/binder-2.png',
			'/media/binder-3.png'
		],
		demoURL: 'https://binder-theta.vercel.app',
		sourceURL: 'https://github.com/resqiar/binder',
		techs: [svelte, typescript, tailwind, jdoodle]
	},
	{
		title: 'Binder Server',
		description:
			"Binder server built with NestJS and Fastify. The server provides and maintains Extension's data to Binder App through its APIs.",
		images: [
			'/media/binder.png',
			'/media/binder-1.png',
			'/media/binder-2.png',
			'/media/binder-3.png'
		],
		demoURL: 'https://binder-theta.vercel.app',
		sourceURL: 'https://github.com/resqiar/binder',
		techs: [typescript, nestjs, fastify, postgres, typeorm, passport]
	}
];
