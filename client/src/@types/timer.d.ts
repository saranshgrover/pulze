declare namespace Timer {
	interface ScrambleDisplayElementAttributes
		extends HTMLElement,
			ScrambleDisplayAttributes {}

	type EventID =
		| '222'
		| '333'
		| '444'
		| '555'
		| '666'
		| '777'
		| '333bf'
		| '333fm'
		| '333oh'
		| 'clock'
		| 'minx'
		| 'pyram'
		| 'skewb'
		| 'sq1'
		| '444bf'
		| '555bf'
		| '333mbf'
		| '333ft'
	type Visualization = '2D' | '3D'

	type ScrambleDisplayAttributes = {
		event?: EventID
		scramble?: string
		visualization?: Visualization
		checkered?: boolean
	}
	export class ScrambleDisplay extends HTMLElement {
		#private
		constructor()
		get event(): EventID | null
		get scramble(): string | null
		get visualization(): Visualization | null
		get checkered(): boolean | null
		set event(s: EventID | null)
		set scramble(s: string | null)
		set visualization(s: Visualization | null)
		set checkered(s: boolean | null)
		protected connectedCallback(): void
		protected attributeChangedCallback(
			name: string,
			oldValue: string,
			newValue: string
		): void
		protected static get observedAttributes(): Array<
			keyof ScrambleDisplayAttributes
		>
	}

	//# sourceMappingURL=scramble-display.d.ts.map

	interface TimerSettings {
		layout: 'drawer' | 'divider3' | 'divider2' | 'simple'
		timerInput: 'manual' | 'timer' | 'stackmat'
		inspection: 'always' | 'never' | 'nonbld'
		timerUpdate: timerUpdate
		timeToRelease: timeToRelease
	}

	enum Layout {
		drawer = 'Drawer',
		divider3 = 'Divider 3',
		divider2 = 'Divider 2',
		simple = 'Simple',
	}

	type timerUpdate =
		| 'deciseconds'
		| 'seconds'
		| 'centiseconds'
		| 'milliseconds'
		| 'none'
		| number // a number means ever X ms
	type timeToRelease = 'none' | 'stackmat'
	interface Solve {
		time: number
		scramble: string
		sessionId: string
		eventId: EventId
		subsetId?: subsetId
		uid: string
		solution?: Solution
		notes?: string
		penalty?: TimerPenalty
		completedAt: number
		lastUpdated: number
	}

	// inspired by https://github.com/cubing/timer-db/blob/main/src/data/Attempt.ts
	interface Attempt {
		totalResultMs: number // the resulting time for an attempt
		scramble: string
		completedAt: number // this date represents the end of the solve (the moment when the timer stopped).
		lastUpdated: number // this date represents the last time any part of the attempt was updated
		puzzle: string // The puzzle(s) being used during the solve. Multple puzzles are separated by dashes (-) (Use array instead?)
		event: string // The event being done on a puzzle.
		sessionID: string
		comment: string // User provided comment on solve
		_id: string
		solution?: Solution
		penalty?: Penaly[]
		// optional place to store additional data
		_meta?: {
			[key: string]: any
		}
	}

	type PuzzleMethod = 'CFOP' | 'Roux' | 'ZZ' | string // Support a definite list of methods?

	interface Solution {
		method?: PuzzleMethod
		reconstruction: string
	}

	interface Penalty {
		ms?: number
		reason?: string
	}

	interface TimerPenalty {
		type: 'DNF' | 'DNS' | '+2'
		amount?: number
	}
	interface Session {
		id: string
		numberOfSolves: number
		mean: number
		eventId: EventId
		subsetId: subsetId
		solves: Solve[]
		current: Stats
		best: Stats
	}
	type SessionWithoutSolves = Omit<Session, 'solves'>
	interface Stats {
		single?: SolveRecord
		mo3?: SolveRecord
		ao5?: SolveRecord
		ao12?: SolveRecord
		ao50?: SolveRecord
		ao100?: SolveRecord
		ao1000?: SolveRecord
	}
	interface SolveRecord {
		time: number
		startSolve: Solve
		numberOfSolves: number
	}
	type SolveMap = Map<string, number>
	type EventId =
		| '222'
		| '333'
		| '444'
		| '555'
		| '666'
		| '777'
		| 'clock'
		| 'minx'
		| 'pyram'
		| 'skewb'
		| 'sq1'
		| string
	type subsetId =
		| '2gll'
		| 'ble'
		| 'cls'
		| 'cmll'
		| 'edges'
		| 'fmc'
		| 'lccp'
		| 'll'
		| 'lsll'
		| 'lu'
		| 'nls'
		| 'pll'
		| 'wv'
		| 'zz'
		| 'tsle'
		| 'zzle'
		| 'zzlsll'
		| undefined
}
