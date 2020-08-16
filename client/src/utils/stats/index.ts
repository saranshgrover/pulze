import AverageComputer from './AverageComputer'

const reduceAmount = (n: number) => {
	return Math.floor(n < 5 ? 0 : n < 12 ? 1 : n < 40 ? n / 12 : n / 20)
}

const isDNF = (time: number) => time === -1

interface Stats {
	name: string
	size: number
	count: number
	last: {
		solves:
			| {
					exclude: boolean
					solve: Timer.Solve
			  }[]
			| null
		stdDev: number
		time: number
	} | null
	best: {
		solves:
			| {
					exclude: boolean
					solve: Timer.Solve
			  }[]
			| null
		stdDev: number
		time: number
	} | null
}

/**
 * This class is responsible for a high-level structuring of statistics for a session of solves.
 * It exports functions to get averages, along with many additional functions to get certain statistics.
 * Note that this is entirely client side. A lot of this is a ts port of https://github.com/unixpickle/average.js/tree/master/src
 * Huge shoutout to Alex for the amazing work he did with CubeZapp.
 */

export default class SessionStats {
	readonly AVERAGE_PB_MINIMUM_COUNT = 5
	readonly FILTER_DNF_CUTOFF = Infinity
	readonly SIZES = [3, 5, 12, 50, 100, 1000]
	readonly NAMES = ['mo3', 'ao5', 'ao12', 'ao50', 'ao100', 'ao1000']

	computers: AverageComputer[] = []
	best: (AverageComputer | null)[] = []
	lastWasPB: boolean[] = []
	averageCounts: number[] = []
	averages: Stats[] = []

	count = 0
	nonDNF = 0
	timeSum = 0
	bestSolve: Timer.Solve | null = null
	bestTime = NaN
	worstSolve: Timer.Solve | null = null
	worstTime = NaN

	constructor(sessionSolves: Timer.Solve[] = []) {
		console.log('Initialize new Session Statistics')
		for (const size of this.SIZES) {
			this.computers.push(new AverageComputer(size, reduceAmount(size)))
			this.best.push(null)
			this.lastWasPB.push(false)
			this.averageCounts.push(0)
		}
	}

	pushSolve(solve: Timer.Solve) {
		++this.count
		if (!isDNF(solve.time)) {
			++this.nonDNF
			this.timeSum += solve.time
			if (this.bestSolve === null || this.bestTime > solve.time) {
				this.bestSolve = solve
				this.bestTime = solve.time
			}
			if (this.worstSolve === null || this.worstTime < solve.time) {
				this.worstSolve = solve
				this.worstTime = solve.time
			}
		}
		for (let i = 0; i < this.computers.length; i++) {
			const computer = this.computers[i]
			computer.pushSolve(solve)
			this.checkBest(i)
		}
		let averages = []
		for (let i = 0; i < this.computers.length; i++) {
			const last = this.computers[i]
			const best = this.best[i]
			averages.push({
				name: this.NAMES[i],
				size: this.SIZES[i],
				count: last.getAverageCount(),
				last: last.averageInfo(last),
				best: best === null ? null : best.averageInfo(last),
			})
		}
		console.log(averages)
		this.averages = averages
	}
	stats() {
		let averages = []
		for (let i = 0; i < this.computers.length; i++) {
			const last = this.computers[i]
			const best = this.best[i]
			averages.push({
				name: this.NAMES[i],
				size: this.SIZES[i],
				count: last.getAverageCount(),
				last: last.averageInfo(last),
				best: best === null ? null : best.averageInfo(last),
			})
		}
		return {
			count: this.count,
			nonDNF: this.nonDNF,
			mean: this.timeSum / this.nonDNF,
			best: this.bestSolve,
			worst: this.worstSolve,
			averages: averages,
		}
	}

	checkBest(computeIndex: number) {
		const computer = this.computers[computeIndex]
		const average = computer.average()
		if (isNaN(average)) {
			this.lastWasPB[computeIndex] = false
		}
		const best = this.best[computeIndex]
		if (best === null || averageBeatsAverage(average, best.average())) {
			this.best[computeIndex] = computer.copy()
			this.lastWasPB[computeIndex] = true
		} else {
			this.lastWasPB[computeIndex] = false
		}
	}
}

function averageBeatsAverage(newAverage: number, oldAverage: number) {
	return Math.floor(newAverage / 10) < Math.floor(oldAverage / 10)
}
