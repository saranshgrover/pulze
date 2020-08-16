import { Scrambow } from 'scrambow'

export default function generateScramble(
	eventId: Timer.EventId,
	subsetId: Timer.subsetId
): string {
	const gen = new Scrambow()
	if (subsetId) {
		return gen.setType(eventId).get()[0].scramble_string
	} else {
		return gen.setType(eventId).get()[0].scramble_string
	}
}
