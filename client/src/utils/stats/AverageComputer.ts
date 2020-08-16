import CenterAverage from './CenterAverage'
import LinkedList from './LinkedList'

const cmpSolves = (left: number, right: number) => {
	if (left < 0 && right < 0) return 0
	else if (left < 0) return 1
	else if (right < 0) return -1
	else return left - right
}

export default class AverageComputer {
	size: number
	numRemove: number
	center: CenterAverage
	averageCount: number = 0
	solves = new LinkedList<Timer.Solve>()
	constructor(size: number, numRemove: number) {
		console.debug(`Initialize new Average Computer for ${size} averages`)
		this.size = size
		this.numRemove = numRemove
		this.center = new CenterAverage(size, numRemove)
	}

	average() {
		return this.center ? this.center.getAverage() : NaN
	}

	getAverageCount() {
		return this.averageCount
	}

	averageInfo(lastComputer: AverageComputer) {
		var average = this.average()
		if (isNaN(average)) {
			return null
		}
		return {
			solves: this.solveExcludeValues(),
			stdDev: this.standardDeviation(),
			time: average,
		}
	}

	copy() {
		const res = new AverageComputer(this.size, this.numRemove)
		res.center = this.center.copy()
		res.solves = this.solves.copy()
		res.averageCount = this.averageCount
		return res
	}

	pushSolve(solve: Timer.Solve) {
		if (solve.time === -1) {
			return
		}
		var time = solve.time
		this.center.pushValue(time)
		this.solves.push(solve)
		if (this.solves.getCount() > this.size) {
			this.solves.shift()
		}
		if (!isNaN(this.average())) {
			++this.averageCount
		}
	}

	solveExcludeValues() {
		if (this.solves.getCount() < this.size) {
			return null
		}
		let list: { exclude: boolean; solve: Timer.Solve }[] = []
		this.solves.forEach((i, solve) => {
			list[i] = { exclude: false, solve: solve }
		})
		list.sort((a, b) => cmpSolves(a.solve.time, b.solve.time))

		for (var i = 0; i < this.numRemove; ++i) {
			list[i].exclude = true
			list[list.length - (i + 1)].exclude = true
		}
		return list
	}

	standardDeviation() {
		return this.center.standardDeviation()
	}
}
