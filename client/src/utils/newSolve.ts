import { generate } from 'shortid'
import generateScramble from './generateScramble'

export default function newSolve(
	eventId: Timer.EventId,
	subsetId: Timer.subsetId,
	sessionId: string
): Timer.Solve {
	return {
		eventId: eventId,
		scramble: generateScramble(eventId, subsetId),
		sessionId: sessionId,
		time: 0,
		uid: generate(),
		subsetId: subsetId,
		completedAt: new Date().getTime(),
		lastUpdated: new Date().getTime(),
	}
}
