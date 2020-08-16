import shortid from 'shortid'

const initialSessionState: Timer.SessionWithoutSolves = {
	numberOfSolves: 0,
	best: {},
	current: {},
	eventId: '333',
	mean: 0,
	id: shortid.generate(),
	subsetId: undefined,
}

export default initialSessionState
