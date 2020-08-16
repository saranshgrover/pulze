import { RxJsonSchema } from 'rxdb'

const solveSchema: RxJsonSchema<Timer.Solve> = {
	title: 'Solve',
	version: 0,
	additionalProperties: false,
	properties: {
		eventId: {
			enum: [
				'222',
				'333',
				'444',
				'555',
				'666',
				'777',
				'clock',
				'minx',
				'pyram',
				'skewb',
				'sq1',
			],
			type: 'string',
		},
		notes: {
			type: 'string',
		},
		penalty: {
			additionalProperties: false,
			properties: {
				amount: {
					type: 'number',
				},
				type: {
					enum: ['DNF', 'DNS', '+2'],
					type: 'string',
				},
			},
			required: ['type'],
			type: 'object',
		},
		scramble: {
			type: 'string',
		},
		sessionId: {
			type: 'string',
		},
		solution: {
			additionalProperties: false,
			properties: {
				method: {
					enum: ['CFOP', 'Roux', 'ZZ'],
					type: 'string',
				},
				reconstruction: {
					type: 'string',
				},
			},
			required: ['reconstruction'],
			type: 'object',
		},
		subsetId: {
			enum: [
				'2gll',
				'ble',
				'cls',
				'cmll',
				'edges',
				'fmc',
				'lccp',
				'll',
				'lsll',
				'lu',
				'nls',
				'pll',
				'wv',
				'zz',
				'tsle',
				'zzle',
				'zzlsll',
			],
			type: 'string',
		},
		time: {
			type: 'number',
		},
		uid: {
			type: 'string',
		},
		completedAt: {
			type: 'number',
		},
		lastUpdated: {
			type: 'number',
		},
	},
	required: [
		'time',
		'scramble',
		'sessionId',
		'eventId',
		'uid',
		'completedAt',
		'lastUpdated',
	],
	type: 'object',
	indexes: ['completedAt'],
}

export default solveSchema
