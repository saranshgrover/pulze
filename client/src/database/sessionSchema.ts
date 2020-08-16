import { RxJsonSchema } from 'rxdb'

const sessionSchema: RxJsonSchema<Timer.SessionWithoutSolves> = {
	title: 'Session',
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
		id: {
			type: 'string',
		},
		mean: {
			type: 'number',
		},
		best: {
			additionalProperties: false,
			properties: {
				ao100: {
					ref: '#/definitions/Timer.SolveRecord',
				},
				ao12: {
					ref: '#/definitions/Timer.SolveRecord',
				},
				ao5: {
					ref: '#/definitions/Timer.SolveRecord',
				},
				ao50: {
					ref: '#/definitions/Timer.SolveRecord',
				},
				single: {
					ref: '#/definitions/Timer.SolveRecord',
				},
			},
			type: 'object',
			definitions: {
				'Timer.SolveRecord': {
					additionalProperties: false,
					properties: {
						numberOfSolves: {
							type: 'number',
						},
						startSolve: {
							ref: '#/definitions/Solve',
						},
						time: {
							type: 'number',
						},
					},
					required: ['time', 'startSolve', 'numberOfSolves'],
					type: 'object',
				},
			},
		},
		current: {
			additionalProperties: false,
			properties: {
				ao100: {
					ref: '#/definitions/Timer.SolveRecord',
				},
				ao12: {
					ref: '#/definitions/Timer.SolveRecord',
				},
				ao5: {
					ref: '#/definitions/Timer.SolveRecord',
				},
				ao50: {
					ref: '#/definitions/Timer.SolveRecord',
				},
				single: {
					ref: '#/definitions/Timer.SolveRecord',
				},
			},
			type: 'object',
			definitions: {
				'Timer.SolveRecord': {
					additionalProperties: false,
					properties: {
						numberOfSolves: {
							type: 'number',
						},
						startSolve: {
							ref: '#/definitions/Solve',
						},
						time: {
							type: 'number',
						},
					},
					required: ['time', 'startSolve', 'numberOfSolves'],
					type: 'object',
				},
			},
		},
		numberOfSolves: {
			type: 'number',
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
	},
	required: ['best', 'current', 'eventId', 'id', 'mean', 'numberOfSolves'],
	type: 'object',
}

export default sessionSchema
