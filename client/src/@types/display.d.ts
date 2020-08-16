interface ScrambleDisplayElementAttributes
	extends HTMLAttributes,
		ScrambleDisplayElementAttributes {}

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
