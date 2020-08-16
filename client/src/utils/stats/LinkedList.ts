class Node<T> {
	object: T
	next: Node<T> | null
	prev: Node<T> | null
	constructor(object: T, next: Node<T> | null, prev: Node<T> | null) {
		this.object = object
		this.next = next
		this.prev = prev
	}
}

export default class LinkedList<T> {
	count: number = 0
	first: Node<T> | null = null
	last: Node<T> | null = null

	copy() {
		const res = new LinkedList<T>()
		let node = this.first
		while (node !== null) {
			res.push(node.object)
			node = node.next
		}
		return res
	}

	getCount = () => this.count

	push(obj: T) {
		++this.count
		const node = new Node<T>(obj, null, this.last)
		if (this.last === null) {
			this.first = node
			this.last = node
		} else {
			this.last.next = node
			this.last = node
		}
	}

	shift() {
		if (this.last === null) {
			return null
		}
		--this.count
		const res = this.last.object
		const newLast = this.last.prev
		this.last = newLast
		if (this.last === null) {
			this.first = null
		} else {
			this.last.next = null
		}
		return res
	}

	forEach(callback: (index: number, object: T) => void) {
		let node = this.first
		let i = 0
		while (node !== null) {
			callback(i, node.object)
			node = node.next
		}
	}
}
