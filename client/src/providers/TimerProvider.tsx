import React, { useContext } from 'react'

type StoreApi = {
	state: typeof initialState
	dispatch: React.Dispatch<Action>
}

const initialState: {
	eventId: Timer.EventId
	subsetId?: Timer.subsetId
	solve?: Timer.Solve
} = {
	eventId: '333',
}
type AppState = typeof initialState
type Action =
	| { type: 'INSPECTION'; payload: Timer.Solve[] | Timer.Solve }
	| { type: 'START'; payload: number }
	| { type: 'STOP'; payload: number }
	| { type: 'CONFIRM'; payload: number }

function reducer(state: AppState, action: Action): AppState {
	switch (action.type) {
		default:
			throw new Error()
	}
}

export const TimerContext = React.createContext<{
	state: typeof initialState
	dispatch: (action: Action) => void
}>({
	state: initialState,
	dispatch: () => {},
})

function TimerProvider({
	eventId,
	subsetId,
	children,
}: React.PropsWithChildren<{
	eventId: Timer.EventId
	subsetId?: Timer.subsetId
}>) {
	initialState.eventId = eventId
	initialState.subsetId = subsetId
	const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
		reducer,
		initialState
	)
	const value = React.useMemo(() => ({ state, dispatch }), [state])
	return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export const useTimer = () => {
	const { state, dispatch } = useContext(TimerContext)
	const solve = state.solve
	return { solve, dispatch }
}
export default TimerProvider
