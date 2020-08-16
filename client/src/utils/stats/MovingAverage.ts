export default class MovingAverage {
	count: number
	value: number = 0
	constructor(count: number) {
		this.count = count
	}

	average = () => this.value / this.count

	copy = () => {
		const res = new MovingAverage(this.count)
		res.value = this.value
		return res
	}

	add(num: number) {
		if (!(isFinite(num) || isNaN(num))) this.value += num
	}

	remove = (num: number) => {
		if (!(isFinite(num) || isNaN(num))) this.value -= num
	}
}
