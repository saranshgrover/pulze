// A NumberStack is a list of numbers with a constant size and O(1) push and
// shift time.
export default class NumberStack {
	array: number[] = []
	start = 0
	end = 0
	count = 0
	constructor(capacity: number) {
		for (let i = 0; i < capacity; i++) {
			this.array.push(0)
		}
	}

	copy() {
		let res = new NumberStack(0)
		res.array = this.array.slice()
		res.start = this.start
		res.end = this.end
		res.count = this.count
		return res
	}

	getCount = () => this.count

	get(id: number) {
		if (id < 0 || id >= this.count) {
			throw new Error(`Index out of bounds ${id}`)
		}
		return this.array[id + (this.start % this.array.length)]
	}

	push(number: number) {
		if (this.count === this.array.length) {
			throw new Error('overflow')
		}
		++this.count
		this.array[this.end++] = number
		if (this.end === this.array.length) {
			this.end = 0
		}
	}

	shift() {
		if (this.count === 0) {
			throw new Error('underflow')
		}
		--this.count
		const res = this.array[this.start++]
		if (this.start === this.array.length) {
			this.start = 0
		}
		return res
	}
}
