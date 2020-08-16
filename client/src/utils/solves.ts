export const decisecondsToClockFormat = (deciseconds: number) => {
	if (!Number.isFinite(deciseconds)) return null
	if (deciseconds === -1) return 'DNF'
	if (deciseconds === -2) return 'DNS'
	return new Date(deciseconds)
		.toISOString()
		.substr(11, 11)
		.replace(/^[0:]*(?!\.)/g, '')
}
export const formatSolve = (attemptResult: number) => {
	return decisecondsToClockFormat(attemptResult)
}
