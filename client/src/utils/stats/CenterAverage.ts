import MovingAverage from './MovingAverage'
import NumberStack from './NumberStack'
import SortedArray from './SortedArray'

const cmpSolves = (left: number, right: number) => {
	if (left < 0 && right < 0) return 0
	else if (left < 0) return 1
	else if (right < 0) return -1
	else return left - right
}

export default class CenterAverage {
	size: number
	numRemove: number
	dnfCount: number = 0
	average: MovingAverage
	chronologicalValues: NumberStack
	sortedValues: SortedArray<number>
	constructor(size: number, numRemove: number) {
		console.debug(`Initialize Center Average for ${size} averages`)
		this.size = size
		this.numRemove = numRemove
		this.average = new MovingAverage(size - numRemove * 2)
		this.chronologicalValues = new NumberStack(size)
		this.sortedValues = new SortedArray<number>(cmpSolves)
	}

	getAverage() {
		return this.average.average()
	}

	copy() {
		const res = new CenterAverage(this.size, this.numRemove)
		res.dnfCount = this.dnfCount
		res.average = this.average.copy()
		res.chronologicalValues = this.chronologicalValues.copy()
		res.sortedValues = new SortedArray<number>(cmpSolves)
		res.sortedValues.insert(this.sortedValues.items)
		return res
	}

	integralValueForAverageBelow(target: number) {
		// TODO: port this
	}

	pushValue(value: number) {
		const wasFullBeforeAddition = this.sortedValues.length === this.size
		if (wasFullBeforeAddition) {
			this.removeOldestValue()
		}
		this.chronologicalValues.push(value)
		if (value < 0) {
			++this.dnfCount
		}
		const index = this.sortedValues.insertOne(value)
		if (this.sortedValues.length < this.size) {
			return
		} else if (!wasFullBeforeAddition) {
			this.computeFirstAverages()
			return
		}
		if (index >= this.numRemove && index < this.size - this.numRemove) {
			this.average.add(value)
		}
		if (index < this.numRemove) {
			this.average.add(this.sortedValues.get(this.numRemove))
		}
		if (index < this.size - this.numRemove && this.numRemove > 0) {
			this.average.remove(this.sortedValues.get(this.size - this.numRemove))
		}
	}

	protected removeOldestValue() {
		const oldValue = this.chronologicalValues.shift()
		if (oldValue < 0) {
			--this.dnfCount
		}

		const removedIndex = this.sortedValues.search(oldValue)
		this.sortedValues.remove(removedIndex)
		if (
			removedIndex >= this.numRemove &&
			removedIndex < this.size - this.numRemove
		) {
			this.average.remove(oldValue)
		}
		if (removedIndex < this.numRemove) {
			const newLowIndex = this.numRemove - 1
			if (this.sortedValues.length > newLowIndex) {
				this.average.remove(this.sortedValues.get(newLowIndex))
			}
		}
		if (removedIndex < this.size - this.numRemove && this.numRemove > 0) {
			const newMiddleIndex = this.size - this.numRemove - 1
			if (this.sortedValues.length > newMiddleIndex) {
				this.average.add(this.sortedValues.get(newMiddleIndex))
			}
		}
	}

	protected computeFirstAverages() {
		for (let i = this.numRemove; i < this.size - this.numRemove; ++i) {
			this.average.add(this.sortedValues.get(i))
		}
	}

	standardDeviation() {
		const average = this.getAverage()
		if (isNaN(average)) {
			return NaN
		}
		let squareDiffs = 0
		let max = this.size - this.numRemove
		for (let i = this.numRemove; i < max; ++i) {
			squareDiffs = Math.pow(average - this.sortedValues.get(i), 2)
		}
		const variance = squareDiffs / this.size - this.numRemove * 2
		return Math.sqrt(variance)
	}
}
